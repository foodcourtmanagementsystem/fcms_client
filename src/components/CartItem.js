import './CartItem.css';
import * as settings from '../config/settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useEffect, useState} from 'react';
import * as cartItemActionTypes from '../actionTypes/cartItem';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/styled/Loading';

function CartItem({cartItem, no}) {
    const initialValues = {
        quantity: cartItem.quantity
    };
    const [values, setValues] = useState(() => initialValues);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const deleteCartItem = useSelector(state => state.cartItem.delete);
    const cartItems = useSelector(state => state.cartItem.data);

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            quantity: cartItem.quantity
        }));

    }, [cartItem.quantity]);



    const handleChange = e => {
        const _errors = {...errors};
        let {name, value} = e.target; 
        if(name === 'quantity') 
        {
            if(value < 1 || value > cartItem.foodItem.stock)  return;
        }
        
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));

        setErrors(_errors);
    }

    const handleBlur = e => {
         if(values.quantity !== cartItem.quantity)
         {
            dispatch({
                type: cartItemActionTypes.EDIT_CART_ITEM_DATA,
                payload: {
                    id: cartItem.id
                }
            });
            dispatch({
                type: cartItemActionTypes.EDIT_CART_ITEM_LOADING
            });
            dispatch({
                type: cartItemActionTypes.EDIT_CART_ITEM,
                payload: {
                    id: cartItem.id,
                    foodItemId: cartItem.foodItemId,
                    quantity: values.quantity
                }
            });
         }
            
    }


    const handleDelete = () => {
        dispatch({
            type: cartItemActionTypes.DELETE_CART_ITEM_DATA,
            payload: {
                id: cartItem.id
            }
        });
        dispatch({
            type: cartItemActionTypes.DELETE_CART_ITEM_LOADING
        });
        dispatch({
            type: cartItemActionTypes.DELETE_CART_ITEM,
            payload: {
                id: cartItem.id
            }
        });
    }
    
  return (
    <div className="cart-item">
        <div className="cart-item__img-no-contanier">
            <div className="cart-item__no">
                {no}
            </div>
            <img src={`${settings.BASE_URL}/${cartItem.foodItem.image}`} className="cart-item__img" />
        </div>
        <div className="cart-item__title">Title : {cartItem.foodItem.title}</div>
        <div className="cart-item__price">Price : Rs. {cartItem.foodItem.price}</div>
        <div className="cart-item__food-category">Category : {cartItem.foodItem.foodCategory.title}</div>
        <div className="cart-item__quantity-contanier">
            <input type="number" name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} className="cart-item__quantity" />
            <div className="card-item__stock">Stock : {cartItem.foodItem.stock}</div>
        </div>
        <div className="cart-item__action-contanier">             
            <button className="cart-item__action" onClick={handleDelete} disabled={deleteCartItem.data && deleteCartItem.data.id === cartItem.id && deleteCartItem.loading}>
                <DeleteForeverIcon />
                {deleteCartItem.data && deleteCartItem.data.id === cartItem.id && deleteCartItem.loading ? 
                'Deleting...' : 'Delete'}
            </button>
        </div>
    </div>
  );
}

export default CartItem;