import './App.css';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from './components/styled/SplashScreen';
import * as userActionTypes from './actionTypes/user';
import {Routes, Route} from 'react-router-dom';
import Web from './pages/Web';
import Dashboard from './pages/Dashboard';
import * as cartItemActionTypes from './actionTypes/cartItem';


function App() {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const listCartItem = useSelector(state => state.cartItem.list);
  const makePayment = useSelector(state => state.payment.make);


  useEffect(() => {

    if(user.isAuthenticated === null) {
        dispatch({
          type: userActionTypes.GET_USER
        });
    } 

  }, [user.isAuthenticated]);

  useEffect(() => {
    if(!listCartItem.success || makePayment.success) 
    {
      dispatch({
        type: cartItemActionTypes.LIST_CART_ITEM_LOADING
      });

        dispatch({
          type: cartItemActionTypes.LIST_CART_ITEM
        });
    }
    
  }, [listCartItem.success, makePayment.success])

  if(user.isAuthenticated === null)
  {
      return (<SplashScreen />);
  }
  
  return (
        <Routes>
          <Route path="/*" element={<Web />} />
          <Route path="/user/:userId/dashboard/*" element={<Dashboard />} />
        </Routes>
  );
}

export default App;
