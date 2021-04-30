import React from 'react';
import { useSelector } from 'react-redux';

const ConfirmEmailScreen = () => {
    const userRegister = useSelector(state => state.userRegister);

    const { message } = userRegister;
    
    return (
        <div>
            <h2>{message.message}</h2>
        </div>
    );
};

export default ConfirmEmailScreen;
