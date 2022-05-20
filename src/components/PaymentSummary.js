import './PaymentSummary.css';
import {useSelector} from 'react-redux';

function PaymentSummary() {
  const cartItems = useSelector(state => state.cartItem.data);

  return (
    <div className="payment-summary">
        <div className="payment-summary__total-orders">
            Total Orders : <span className='payment-summary__info'>{cartItems.length}</span> 
        </div>
        <div className="payment-summary__total-amount">
            Total Amount : <span className="payment-summary__info">Rs. {cartItems.reduce((acc, cartItem) => acc + cartItem.foodItem.price * cartItem.quantity, 0)} </span>
        </div>
    </div>
  );
}

export default PaymentSummary;