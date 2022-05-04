import './FoodCategory.css';
import {NavLink} from 'react-router-dom';

function FoodCategory({item}) {

  const {Id, Title, Image} = item;

  return (
    <NavLink to={`/foodcategory/${Id}`} className='food-category'>
        <img src={Image} className='food-category__image' alt={Title} title={Title} />
        <div className='food-category__title'>{Title}</div>
    </NavLink>
  );
}

export default FoodCategory;