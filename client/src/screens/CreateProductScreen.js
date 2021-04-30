import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createProductAction } from '../actions/productActions';

const CreateProductScreen = (props) => {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);

    const [data, setData] = useState({
        name: '',
        image: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: '',
    });
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const { name, image, category, description, price, countInStock, brand } = data;

    const { user } = userSignin;

    const changeHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const uploadFileHandler = async e => {
        const file = e.target.files[0];
        var bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`
                }
            });
            setData({image: data});
            setLoadingUpload(false);
        } catch (error) {
            console.log(error.message);
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        dispatch(createProductAction(data));
        props.history.push('/');
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Create Product</h1>
            </div>
                <div>
                    <label htmlFor="name">Name Product</label>
                    <input
                        name="name" 
                        type="text" 
                        value={name}
                        id="name"
                        placeholder="Enter Name"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input 
                        name="price"
                        type="text" 
                        value={price}
                        id="price"
                        placeholder="Enter Price"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        name="image"
                        type="text" 
                        value={image}
                        id="image"
                        placeholder="Enter Image"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="imageFile">Image File</label>
                    <input
                        type="file"
                        id="imageFile"
                        label="Choose image"
                        onChange={uploadFileHandler}
                    />  
                    {loadingUpload && <LoadingBox/>}
                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>} 
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input 
                        name="category"
                        type="text" 
                        value={category}
                        id="category"
                        placeholder="Enter category"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="countInStock">Count In Stock</label>
                    <input 
                        name="countInStock"
                        type="number" 
                        value={countInStock}
                        id="countInStock"
                        placeholder="Enter countInStock"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input 
                        name="brand"
                        type="text" 
                        value={brand}
                        id="brand"
                        placeholder="Enter brand"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label htmlFor="description">Description of the Product</label>
                    <textarea 
                        name="description"
                        type="text" 
                        rows="3"
                        value={description}
                        id="description"
                        placeholder="Enter description"
                        onChange={changeHandler}
                        />
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Update
                    </button>
                </div>
        </form>
    </div>
    );
};

export default CreateProductScreen;