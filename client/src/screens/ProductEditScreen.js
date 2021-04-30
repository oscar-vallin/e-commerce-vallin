import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsProductsAction } from '../actions/productActions';
import { updateProductAction } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { PRODUCT_UPDATE_RESET } from '../constans/productConstants';
import axios from 'axios';

const ProductEditScreen = (props) => {
    const productId = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const productUpdate = useSelector(state => state.productUpdate);
    const userSignin = useSelector(state => state.userSignin);
    const [state, setState] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
        brand: '',
        description: ''
    });
    const { name, price, image, category, countInStock, brand, description } = state;

    const { loading, error, product } = productDetails;
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate;
    const { user } = userSignin;

    useEffect(() => {
        if(successUpdate){
            history.push('/productlist');
        }
        if(!product || (product._id !== productId) || successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProductsAction(productId));
        }else{
            setState({...product});
        }
    },[dispatch, productId, product, successUpdate, history]);
    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateProductAction({_id: productId, state}));
    };
    
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    
    const uploadFileHandler = async e => {
        const file = e.target.files[0];
        var bodyFormData = new FormData();
        bodyFormData.append('image', file);
        console.log(bodyFormData)
        setLoadingUpload(true);
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`
                }
            });
            setState({image: data});
            setLoadingUpload(false);
        } catch (error) {
            console.log(error.message);
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox/>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox />
                : 
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <>
                    <div>
                        <label htmlFor="name">Name Product</label>
                        <input 
                            type="text" 
                            value={name || ''}
                            id="name"
                            placeholder="Enter Name"
                            onChange={e => setState({...state, name: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input 
                            type="text" 
                            value={price || ''}
                            id="price"
                            placeholder="Enter Price"
                            onChange={e => setState({...state, price: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input 
                            type="text" 
                            value={image || ''}
                            id="image"
                            placeholder="Enter Image"
                            onChange={e => setState({...state, image: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input
                            type="file"
                            id="imageFile"
                            label="Choose image"
                            onChange={uploadFileHandler}/>
                        {loadingUpload && <LoadingBox/>}
                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}    
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input 
                            type="text" 
                            value={category || ''}
                            id="category"
                            placeholder="Enter category"
                            onChange={e => setState({...state, category: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="countInStock">Count In Stock</label>
                        <input 
                            type="number" 
                            value={countInStock || ''}
                            id="countInStock"
                            placeholder="Enter countInStock"
                            onChange={e => setState({...state, countInStock: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input 
                            type="text" 
                            value={brand || ''}
                            id="brand"
                            placeholder="Enter brand"
                            onChange={e => setState({...state, brand: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="description">Description of the Product</label>
                        <textarea 
                            type="text" 
                            rows="3"
                            value={description || ''}
                            id="description"
                            placeholder="Enter description"
                            onChange={e => setState({...state, description: e.target.value})}
                            />
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">
                            Update
                        </button>
                    </div>
                </>
                }
            </form>
        </div>
    );
}

export default ProductEditScreen; 