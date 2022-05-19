import {combineReducers} from 'redux';
import foodCategoryReducer from './foodCategory';
import userReducer from './user';
import fileReducer from './file';
import foodItemReducer from './foodItem';
import cartItemReducer from './cartItem';
import userAddressReducer from './userAddress';


const rootReducer = combineReducers({
    foodCategory: foodCategoryReducer,
    user: userReducer,
    file: fileReducer,
    foodItem: foodItemReducer,
    cartItem: cartItemReducer,
    userAddress: userAddressReducer
});

export default rootReducer;