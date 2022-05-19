import './Cart.css';
import {useSelector} from 'react-redux';
import CartItem from '../components/CartItem';
import {useNavigate} from 'react-router-dom';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';

function Cart() {
  const cartItems = useSelector(state => state.cartItem.data);
  const listCartItem = useSelector(state => state.cartItem.list);
  const navigate = useNavigate();

  const checkoutPage = e => {
    navigate('/payment');
  }

  if(listCartItem.loading)
    return (<Loading />);
  
  if(listCartItem.error)
    return (<Error error={listCartItem.error} />);

  if(cartItems.length === 0)
    return (<div className="cart-empty">
              Your cart is empty! Select your food items.
            </div>)

  return (
    <div className="cart">
      <div className="cart__items">
        {cartItems.map((cartItem, index) => (<CartItem key={index} cartItem={cartItem} no={index+1}  />))}
      </div>
      <div className="cart__summary-checkout">
        <div className="cart__summary">
          <div className="cart-summary__orders">
            Total Orders : {cartItems.length}
          </div>
          <div className="cart-summary__amount">
            Total Amount : Rs. {cartItems.reduce((acc, cartItem) => acc + cartItem.foodItem.price * cartItem.quantity, 0)}
          </div>
        </div>
        <div className="cart__checkout">
           <button className="cart__checkout-btn" onClick={checkoutPage}>Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;