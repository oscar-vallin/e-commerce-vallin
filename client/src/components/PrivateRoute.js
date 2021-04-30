import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

export default function PrivateRoute({component: Component, ...rest}) {
    const userSignin = useSelector(state => state.userSignin);
    const userRegister = useSelector(state => state.userRegister);

    const { user } = userSignin;
    const { message } = userRegister;
    return (
        <Route {...rest} render={props => user || message.message ? (<Component {...props}></Component>):
        (
            <Redirect to="/signin"/>
        )
    }
        ></Route>
    );
};
