
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutAction } from '../actions/userAction';
import { listProductsCategoryAction } from '../actions/productActions';
import SideBar from './SideBar';

export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userInfo = useSelector(state => state.userSignin);
    const { user } = userInfo;
    const productCategory = useSelector(state => state.productCategory);
    const {  categories } = productCategory;
   
    const signoutHandler = () => {
        dispatch(signoutAction());
        history.push('/');
    };
    useEffect(() => {
        dispatch(listProductsCategoryAction())
      },[dispatch]);

    return (
        <div className="grid-container">
            <header className="row">
                <div>
                    <button
                        type="button"
                        className="open-sidebar"
                        onClick={() => setSideBarIsOpen(true)}
                    >
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link className="brand" to="/">Store Vallin</Link>
                </div>
                <div>
                </div>
                <div>
                    <Link to="/cart">Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>
                    {
                            
                        user ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {user.name} <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">
                                           User Prodile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">
                                            Order History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Singn In</Link>
                        )
                    }
                    {user && user.isSeller && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Seller <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller">Product</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/seller">Order</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    {user && user.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Admin <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Product</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">Order</Link>
                                </li>
                                <li>
                                    <Link to="/userlist">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
           { categories && <SideBar 
                sideBarIsOpen={sideBarIsOpen}
                setSideBarIsOpen={setSideBarIsOpen}
            />}
        </div>
    );
};

export default Header;
