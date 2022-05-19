import './AddToCart.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'; 
import {useNavigate} from 'react-router-dom';
import * as cartItemActionTypes from '../actionTypes/cartItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function AddToCart({foodItem}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItem.data);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAddedToCart(cartItems.filter(cartItem => cartItem.foodItemId === foodItem.id).length > 0);
  }, [cartItems, foodItem.id]);

  useEffect(() => {
     if(addedToCart)
     {
       setAddingToCart(false);
     }

  }, [addedToCart]);

  const addToCart = e => {
    if(addedToCart)
    {
      navigate("/cart");
    }
    else
    {
      setAddingToCart(true);
      dispatch({
        type: cartItemActionTypes.CREATE_CART_ITEM_LOADING
      });
  
      dispatch({
        type: cartItemActionTypes.CREATE_CART_ITEM,
        payload: {
          foodItemId: foodItem.id,
          quantity: 1
        }
      });
    }
   
  }

  return (addedToCart ? 
        <button className={`food-item__cart-btn ${addedToCart && 'food-item__cart-btn--added-to-cart'}`} onClick={addToCart}>
          <ShoppingCartIcon />
          Go to cart
        </button>
        :
        <button disabled={addingToCart} className={`food-item__cart-btn`} onClick={addToCart}>
          <AddShoppingCartIcon />
           Add to cart
        </button>
    );
}

export default AddToCart;