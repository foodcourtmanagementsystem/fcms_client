import './FoodCategory.css';
import {useEffect} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as foodCategoryActionTypes from '../actionTypes/foodCategory';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import * as settings from '../config/settings';
import FoodItem from '../components/FoodItem';

function FoodCategory() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const getFoodCategory = useSelector(state => state.foodCategory.get);
  const foodCategory = useSelector(state => state.foodCategory.get.data);

  useEffect(() => {
    
    if(!getFoodCategory.success && id)
    {
      dispatch({
        type: foodCategoryActionTypes.GET_FOOD_CATEGORY_LOADING
      });
      dispatch({
        type: foodCategoryActionTypes.GET_FOOD_CATEGORY,
        payload: {
          id 
        }
      });

    }

  }, [getFoodCategory.success, id]);


  return (
    <div className="food-category-page">
      {getFoodCategory.loading && <Loading />}
      {getFoodCategory.error && <Error error={getFoodCategory.error} />} 
      <div className="food-category-page__food-items">
        {foodCategory && foodCategory.foodItems.map((foodItem, index) => (<FoodItem key={index} foodItem={foodItem} />))}
      </div>
    </div>
  );
}

export default FoodCategory;