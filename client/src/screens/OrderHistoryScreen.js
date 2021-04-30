import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listOrderMineAction } from '../actions/orderAction';
import { useEffect } from 'react';

const OrderHistoryScreen = (props) => {
    const dispatch = useDispatch();
    const orderMineList = useSelector(({orderMineList}) => orderMineList);
    const { error, loading, orders } = orderMineList;

    useEffect(() => {
        dispatch(listOrderMineAction())
    },[dispatch]);
    return (
        <div>
            <h1>Order History</h1>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    );
};
export default OrderHistoryScreen;