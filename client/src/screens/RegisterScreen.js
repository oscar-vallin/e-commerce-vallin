import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { registerAction } from '../actions/userAction';
import usePasswordToggle from '../hooks/usePasswordToggle';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const SigninScreen = (props) => {
    const [inputType, setVisible, visible] = usePasswordToggle();

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'femenino',
        age: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordFocused,setPasswordFocused] = useState(false);
    const[ passwordValidity, setPasswordValidity ]= useState({
        minChar: false,
        number: false,
        specialChar: false,
    });

    const {minChar, number, specialChar} = passwordValidity;
    const { message, loading, error } = userRegister;
    const { email, name, password, confirmPassword, phone, age, gender } = data;

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        :'/';

    const changeHandler = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            alert('Password and confirm password are not match');
        }else{
            dispatch(registerAction(data));
        }
       
    };

    useEffect(() => {
        if(password.trim() === '' || password){
            setPasswordValidity({
                minChar: password.length >= 8 ? true : false,
                number: isNumberRegx.test(password),
                specialChar: specialCharacterRegx.test(password) ? true : false
            });
        }
        if(message){
            props.history.push('/confirm-email');
        }
    },[props.history, redirect, message,password])
    return (
        <div>
            <form 
                className="form"
                onSubmit={submitHandler}>
                    <div>
                        <h1>Create Account</h1>
                    </div>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            value={name}
                            id="name"  
                            name="name"
                            placeholder="Enter name" 
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">phone</label>
                        <input 
                            type="tel" 
                            value={phone}
                            id="phone"  
                            name="phone"
                            placeholder="Enter phone" 
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Age</label>
                        <input 
                            type="number" 
                            value={age}
                            id="age"  
                            name="age"
                            placeholder="Enter age" 
                            min="0"
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <div>Genero</div>
                        <select  name="gender" value={gender} onChange={changeHandler}>
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            id="email"  
                            name="email"
                            placeholder="Enter email" 
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type={inputType}
                            id="password" 
                            name="password" 
                            value={password}
                            onFocus={() => setPasswordFocused(true)}
                            placeholder="Enter password" 
                            onChange={changeHandler}
                        /> 
                        <span className="password-toggle-icon" onClick={() => setVisible(visible => !visible)}>
                            { visible ? <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                :<i className="fas fa-eye" ></i>
                            }    
                        </span>
                    </div>
                    <div>
                        {passwordFocused && <ul>
                            <PasswordStrengthIndicator
                                minChar={minChar}
                                number={number}
                                specialChar={specialChar}
                            />
                        </ul>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword"  
                            name="confirmPassword"
                            placeholder="Confirm password" 
                            disabled={minChar && number && specialChar ? false: true}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Crear Usuario</button>
                    </div>
                    <div>
                        <label/>
                        <div>
                            Already have an account? {' '}
                            <Link to={`/signin?redirect=${redirect}`}>
                               Log in
                            </Link>
                        </div>
                    </div>
            </form>
        </div>
    );
};

export default SigninScreen;
