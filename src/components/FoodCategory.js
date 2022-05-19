import './FoodCategory.css';
import {NavLink} from 'react-router-dom';
import * as settings from '../config/settings';
import * as foodCategoryActionTypes from '../actionTypes/foodCategory';
import {useSelector, useDispatch} from 'react-redux';

function FoodCategory({item}) {

  const {id, title, image} = item;
  const foodCategory = useSelector(state => state.foodCategory.get.data);
  const dispatch = useDispatch();

  const handleClick = e => {
     if(foodCategory && foodCategory.id !== id)
     {
       dispatch({
         type: foodCategoryActionTypes.GET_FOOD_CATEGORY_INITIAL_STATE
       });
     }
  
  }

  return (
    <NavLink to={`/foodcategory/${id}`} className='food-category' onClick={handleClick}>
        <img src={`${settings.BASE_URL}/${image}`} className='food-category__image' alt={title} title={title} />
        <div className='food-category__title'>{title}</div>
    </NavLink>
  );
}

export default FoodCategory;