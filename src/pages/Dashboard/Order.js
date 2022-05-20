import './Order.css';
import {useSelector} from 'react-redux';
import * as orderItemActionTypes from '../../actionTypes/orderItem';
import OrderItem from '../../components/OrderItem';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import Loading from '../../components/styled/Loading';
import Error from '../../components/styled/Error';
import Info from '../../components/styled/Info';

function Order() {
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
          URL: "/api/OrderItems/Admin"
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
      <div className="orders">
        <h5 style={{
          textAlign: 'center'
        }}>Orders</h5>
        {orderItems.length === 0 && <Info info="There are no orders." />}
        {orderItems.map((orderItem, index) => (<OrderItem key={index} orderItem={orderItem} no={index+1} />))}
      </div>
  );
}

export default Order;