import './FoodItem.css';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import * as foodItemActionTypes from '../actionTypes/foodItem';
import * as settings from '../config/settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddToCart from '../components/AddToCart';

function FoodItem() {

  const getFoodItem = useSelector(state => state.foodItem.get); 
  const {id} = useParams();
  const foodItem = useSelector(state => state.foodItem.get.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!getFoodItem.success && id)
    {
       dispatch({
         type: foodItemActionTypes.GET_FOOD_ITEM_LOADING
       });
       dispatch({
         type: foodItemActionTypes.GET_FOOD_ITEM,
         payload: {
           id
         }
       });
    }

  }, [getFoodItem.success, id]);

  if(getFoodItem.loading)
  {
      return (
        <Loading />
      );
  }

  if(getFoodItem.error)
  {
    return (<Error error={getFoodItem.error} />);
  }

  return (
    <div className='food-item-page'>
      <div className='food-item-page__header'>
        <ArrowBackIcon className='icon' onClick={() => {
          navigate(-1);
        }} />
      </div>
      <div className='food-item-page__body'>
      {foodItem && <>
        <div className='food-item-page__left'>
          <img className='food-item-page__image' src={`${settings.BASE_URL}/${foodItem.image}`} />
          <AddToCart foodItem={foodItem} />
        </div>
        <div className="food-item-page__right">
          <div className='food-item-page__title'>
            {foodItem.title}
          </div>
          <div className='food-item-page__category'>
            Description : {foodItem.foodCategory.title}
          </div>
          <div className='food-item-page__price'>
            Price : Rs. {foodItem.price}
          </div>
          <div className='food-item-page__price'>
             Stock : {foodItem.stock}
          </div>
          <div className='food-item-page__description'>
            Description : {foodItem.description}
          </div>
        </div>
      </> }
      </div>
    </div>
  );
}

export default FoodItem;