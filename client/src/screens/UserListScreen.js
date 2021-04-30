import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction, deleteUserAction } from '../actions/userAction';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { DELETE_USER_RESET, DETAILS_USER_RESET } from '../constans/userConstans';

const UserListScreen = props => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const userDelete = useSelector(state => state.userDelete);

    const { users, loading, error } = userList;
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

    useEffect(() => {
        dispatch(getUsersAction());
        dispatch({type: DETAILS_USER_RESET});
        setTimeout(() => {
            dispatch({type: DELETE_USER_RESET});
        },3000)
    },[dispatch, successDelete]);

    const deleteHandler = user => {
        if(window.confirm('Are you sure')){
            dispatch(deleteUserAction(user._id));
        };
    };

    return (
        <div>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            {loading ? <LoadingBox />
            : error ? 
            <MessageBox variant="danger">{error}</MessageBox>
            : 
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Is Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Yes": "No"}</td>
                                    <td>{user.isSeller ? "Yes": "No"}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                        >Edit</button>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(user)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
            }
        </div>
    )
}

export default UserListScreen;