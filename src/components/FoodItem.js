import './FoodItem.css';
import {NavLink} from 'react-router-dom';
import * as settings from '../config/settings';
import {useDispatch} from 'react-redux';
import * as foodItemActionTypes from '../actionTypes/foodItem';

import AddToCart from '../components/AddToCart';


const FoodItem = ({foodItem}) => {
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch({
      type: foodItemActionTypes.GET_FOOD_ITEM_SUCCESS,
      payload: foodItem
    });
  }

  
  return (
    <div className="food-item">
      <NavLink to={`/fooditem/${foodItem.id}`} onClick={handleClick}>
        <img className="food-item__image" src={`${settings.BASE_URL}/${foodItem.image}`} 
          title={foodItem.title} 
          alt={foodItem.title} />
      </NavLink>

      <div className="food-item__title">
        {foodItem.title}
      </div>
      <div className="food-item__price">
        Rs. {foodItem.price}
      </div>
      <div className="food-item__cart-btn-container">
         <AddToCart foodItem={foodItem} />
      </div>
    </div>
  );
}

export default FoodItem;