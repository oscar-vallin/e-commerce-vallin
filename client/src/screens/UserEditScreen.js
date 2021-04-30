import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUserAction, updateUser } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constans/userConstans';

const UserEditScreen = props => {
    const userId = props.match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const userDetails = useSelector(state => state.userDetails);
    const userUpdate = useSelector(state => state.userUpdate);

    const { user, loading, error } = userDetails;
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const [state, setState] = useState({
        name: '',
        email: '',
        isSeller: false,
        isAdmin: false
    });
    const { name, email } = state;

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            history.push('/userlist');
        }
        if(!user){
            dispatch(detailsUserAction(userId));
        }else{
            setState({
                name: user.name, 
                email: user.email,
                isSeller: user.IsSeller,
                isAdmin: user.IsAdmin
            });
        }
    },[dispatch, user, userId, successUpdate, history]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateUser({_id: userId, data: state}))
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit user {name}</h1>
                    {loadingUpdate && <LoadingBox/>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                    {loading ? 
                        <LoadingBox /> :
                    error ? 
                        <MessageBox variant="danger">{error}</MessageBox>    
                    : 
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="Enter Name" 
                                value={name}
                                onChange={e => setState({...state,name: e.target.value})}
                            />    
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                type="text" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={e => setState({...state,email: e.target.value})}
                            />    
                        </div>
                        <div>
                            <label htmlFor="isSeller">Is Seller</label>
                            <input 
                                id="isSeller" 
                                type="checkbox" 
                                onChange={e => setState({...state, isSeller: e.target.checked})}
                            />    
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input 
                                id="isAdmin" 
                                type="checkbox" 
                                onChange={e => setState({...state, isAdmin: e.target.checked})}
                            />    
                        </div>
                        <div>
                            <button className="primary" type="submit">
                                update
                            </button>
                        </div>
                    </>    
                    }
            </form>
        </div>
    );
};

export default UserEditScreen;
