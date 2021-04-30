import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(data => data.userSignin)
    const { user, loading, error } = userInfo;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        :'/';

      
    const submitHandler = e => {
        e.preventDefault();
        dispatch(signinAction({email, password}));
        
    };

    useEffect(() => {
        if(user){
            props.history.push(redirect)
        }
    },[props.history, redirect, user])
    return (
        <div>
            <form 
                className="form"
                onSubmit={submitHandler}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"  placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"  placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Sing In</button>
                    </div>
                    <div>
                        <label/>
                        <div>
                            New customer? {' '}
                            <Link to={`/register?redirect=${redirect}`}>
                               Create User
                            </Link>
                        </div>
                    </div>
            </form>
        </div>
    );
};

export default SigninScreen;
