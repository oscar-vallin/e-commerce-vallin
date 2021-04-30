import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

//routes user
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterActions from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import SellerScreen from './screens/SellerScreen';
import ProfileScreen from './screens/ProfileScreen';


import CartScreen from './screens/CartScreen';

//routes admin
import ProductListScreen from './screens/ProductListScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import UserListScreen from './screens/UserListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserEditScreen from './screens/UserEditScreen';

//private routes
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute';
import SearchScreen from './screens/SearchScreen';
import CreateProductScreen from './screens/CreateProductScreen';



function App() {
  return(
    <div  className="grid-container">
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={HomeScreen}/>
                <Route exact path="/seller/:id" component={SellerScreen} />
                <Route exact path="/product/:id" component={ProductScreen} />
                <Route exact path="/signin" component={SigninScreen}/>
                <Route exact path="/register" component={RegisterActions}/>
                <Route exact path="/shipping" component={ShippingAddressScreen}/>
                <Route exact path="/payment" component={PaymentMethodScreen}/>
                <Route exact path="/placeolder" component={PlaceOrderScreen}/>
                <Route exact path="/order/:id" component={OrderScreen}/>
                <Route exact path="/orderhistory" component={OrderHistoryScreen}/>
                <Route exact path="/search/name/:name?" component={SearchScreen}/>
                <Route exact path="/search/category/:category" component={SearchScreen}/>
                <Route exact path="/search/category/:category/name/:name" component={SearchScreen}/>
                <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen}/>
                <PrivateRoute exact path="/profile" component={ProfileScreen}/>
                <PrivateRoute exat path="/confirm-email" component={ConfirmEmailScreen} />
                <AdminRoute exact path="/productlist" component={ProductListScreen}/>
                <AdminRoute exact path="/orderlist" component={OrdersListScreen}/>
                <AdminRoute exact path="/product/:id/edit" component={ProductEditScreen}/>
                <AdminRoute exact path="/userlist" component={UserListScreen}/>
                <AdminRoute exact path="/user/:id/edit" component={UserEditScreen} />
                <SellerRoute exat path="/productlist/seller" component={ProductListScreen}/>
                <SellerRoute exact path="/createproduct/seller" component={CreateProductScreen}/>
                <SellerRoute exat path="/orderlist/seller" component={OrdersListScreen}/>
                <Route exact path="/cart/:id?" component={CartScreen} />
            </Switch>
        </Router>
        <footer className="row center">
                All right reserved
        </footer>
    </div>
  );
}

export default App;
