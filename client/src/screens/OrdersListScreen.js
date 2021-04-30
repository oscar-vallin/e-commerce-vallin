import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUsersAction, deleteOrderAction } from '../actions/orderAction';
import { ORDER_DELETE_RESET } from '../constans/orderConstants';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

const OrdersListScreen = props => {
    console.log(props.match.path)
    const sellerMode = props.match.path.indexOf('/seller')>=0;

    const dispatch = useDispatch();

    const ordersList = useSelector(state => state.orderUsersList);
    const orderDelete = useSelector(state => state.orderDelete);
    const userSignin = useSelector(state => state.userSignin);

    const { loading, error, orders } = ordersList;
    const { loading: loadingDelete, error: errorDelete, success: successDelete, messageSuccess } = orderDelete;
    const { user } = userSignin;

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(getOrdersUsersAction({seller: sellerMode ? user._id: ''}));
    },[dispatch, successDelete, user, sellerMode]);

    const deleteHandler = order => {
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteOrderAction(order._id));
        }
    };

    return (
        <div>
            <h1>Order History</h1>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {messageSuccess && <MessageBox variant="success">{messageSuccess}</MessageBox>}
            {loading ? <LoadingBox/>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.isPaid.substring(0,10): 'no paid'}</td>
                                <td>{order.isDelivered ? order.isDelivered.substring(0,10): 'no paid'}</td>
                                <td>
                                    <button
                                        className="small"
                                        type="button"
                                        onClick={() => props.history.push(`/order/${order._id}`)}
                                    >
                                        Details
                                    </button>
                                    <button 
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order)}
                                        >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    );
}

export default OrdersListScreen;