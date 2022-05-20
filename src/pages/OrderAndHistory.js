import './OrderAndHistory.css';
import {useSelector} from 'react-redux';
import * as orderItemActionTypes from '../actionTypes/orderItem';
import OrderItem from '../components/OrderItem';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import Warning from '../components/styled/Warning';

function OrderAndHistory() {
  const orderItems = useSelector(state => state.orderItem.data);
  const listOrderItem = useSelector(state => state.orderItem.list);
  const dispatch = useDispatch();

  useEffect(() => {

      dispatch({
        type: orderItemActionTypes.LIST_ORDER_ITEM_LOADING,
      });

      dispatch({
        type: orderItemActionTypes.LIST_ORDER_ITEM,
        payload: {
          URL: "/api/OrderItems"
        }
      });

     

  }, []);

  if(listOrderItem.loading)
  {
     return (<Loading />);
  }

  if(listOrderItem.error)
  {
    return (<Error error={listOrderItem.error} />)
  }

  return (
    <div className="order-and-history">
      <div className="orders">
        <h5>Your Orders</h5>
        {orderItems.filter(orderItem => !orderItem.isProcessed).length === 0 && <Warning warning="You have currently no orders." />}
        {orderItems.filter(orderItem => !orderItem.isProcessed).map((orderItem, index) => (<OrderItem key={index} orderItem={orderItem} no={index+1} />))}
      </div>
      <div className="history">
        <h5>Order History</h5>
        {orderItems.filter(orderItem => orderItem.isProcessed).length === 0 && <Warning warning="You have currently no order history." />}
        {orderItems.filter(orderItem => orderItem.isProcessed).map((orderItem, index) => (<OrderItem key={index} orderItem={orderItem} no={index+1} />))}
      </div>
    </div>
  );
}

export default OrderAndHistory;