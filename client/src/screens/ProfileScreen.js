import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUserAction, updateUserProfileAction } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constans/userConstans';
const ProfileScreen = () => {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const userDetails = useSelector(state => state.userDetails);
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
   
    const [data, setData] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
        sellerName: '',
        sellerLogo: '',
        sellerDescription: ''
    });

    const { user } = userSignin;
    const { user: userD, error, loading } = userDetails;
    const { name, email, password, confirmPassword, sellerName, sellerLogo, sellerDescription } = data;

    useEffect(() => {
        if(!userD){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUserAction(user._id));
        }else {
            console.log("perro")
            setData({name: userD.name, email: userD.email});
            if(userD.isSeller){
                setData({
                    name: userD.name,
                    email: userD.email,
                    sellerName: userD.seller.name,
                    sellerLogo: userD.seller.logo,
                    sellerDescription: userD.seller.description
                });
            }
        }
        
    },[dispatch, user, userD]);

    const onChangeHandler =  e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('password and confirm password are not matched');
        }else{
            dispatch(updateUserProfileAction({userId: userD._id, data}));
        }

    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                    {userUpdateProfile.loading && <LoadingBox/>}
                    {userUpdateProfile.error && <MessageBox variant="danger">{userUpdateProfile.error}</MessageBox>}
                    {userUpdateProfile.success && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name" 
                                name="name"
                                placeholder="Enter name" 
                                type="text" 
                                value={name} 
                                onChange={onChangeHandler}
                            />    
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                name="email"
                                placeholder="Enter email" 
                                type="text" 
                                value={email} 
                                onChange={onChangeHandler}
                            />    
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                name="password"
                                placeholder="Enter password" 
                                type="password" 
                                value={password}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                id="confirmPassword" 
                                name="confirmPassword"
                                placeholder="Enter confirmPassword" 
                                type="password" 
                                value={confirmPassword}
                                onChange={onChangeHandler}
                            />
                        </div>
                        {
                            user.isSeller && (
                                <>
                                    <h2>Seller</h2>
                                    <div>
                                        <label htmlFor="sellerName">Seller Name</label>
                                        <input
                                            id="sellerName"
                                            name="sellerName"
                                            placeholder="Enter name"
                                            type="text"
                                            value={sellerName}
                                            onChange={onChangeHandler}
                                        />    
                                    </div>
                                    <div>
                                        <label htmlFor="sellerLogo">Seller Logo</label>
                                        <input
                                            id="sellerLogo"
                                            name="sellerLogo"
                                            placeholder="Enter Logo"
                                            type="text"
                                            value={sellerLogo}
                                            onChange={onChangeHandler}
                                        />    
                                    </div>
                                    <div>
                                        <label htmlFor="sellerDescription">Seller Description</label>
                                        <textarea
                                            id="sellerDescription"
                                            rows="3"
                                            name="sellerDescription"
                                            placeholder="Enter Description"
                                            type="text"
                                            value={sellerDescription}
                                            onChange={onChangeHandler}
                                        />    
                                    </div>
                                </>
                            )
                        }
                        <div>
                            <label/>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
export default  ProfileScreen;