import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProductsAction } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { deleteProductAction } from '../actions/productActions';
import { PRODUCT_DELETE_RESET } from '../constans/productConstants';

const ProductListScreen = (props) => {
    const sellerMode = props.match.path.indexOf('/seller')>=0;

    const productList = useSelector(state => state.productList);
    const productCreate = useSelector(state => state.productCreate);
    const productDelete = useSelector(state => state.productDelete);
    const userSignin = useSelector(state => state.userSignin);

    const dispatch = useDispatch();
    const history = useHistory();

    const { products, loading, error } = productList;
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const { user } = userSignin;

    useEffect(() => {
        if(successDelete){
            dispatch({type:PRODUCT_DELETE_RESET});
        }
        dispatch(listProductsAction({seller: sellerMode?user._id:''}));
    },[dispatch, successCreate, history, createdProduct, successDelete, user, sellerMode]);

    const deleteHandler = product => {
        dispatch(deleteProductAction(product._id));
    };
    const createHandler = () => {
        history.push('/createproduct/seller');
    }
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button 
                    type="button" 
                    className="primary"
                    onClick={createHandler}
                >Create Produc</button>
            </div>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox/>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? 
                <LoadingBox />
            : 
                error ? <MessageBox variant="danger">{error}</MessageBox>
            : 
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <th>{product._id}</th>
                                <th>{product.name}</th>
                                <th>{product.price}</th>
                                <th>{product.category}</th>
                                <th>{product.brand}</th>
                                <th>
                                    <button 
                                        type="button" 
                                        className="small"
                                        onClick={() => history.push(`/product/${product._id}/edit`)}
                                    >Edit</button>
                                    <button 
                                        type="button" 
                                        className="small"
                                        onClick={() => deleteHandler(product)}
                                    >Delete</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default ProductListScreen;