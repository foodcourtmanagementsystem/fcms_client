import {all, fork} from 'redux-saga/effects';
import * as foodCategorySagas from './foodCategory';
import * as userSagas from './user';
import * as fileSagas from './file';
import * as foodItemSagas from './foodItem';
import * as cartItemSagas from './cartItem';
import * as userAddressSagas from './userAddress';

function* rootSaga()
{
    yield all([
        ...Object.values(foodCategorySagas).map(fork),
        ...Object.values(userSagas).map(fork),
        ...Object.values(fileSagas).map(fork),
        ...Object.values(foodItemSagas).map(fork),
        ...Object.values(cartItemSagas).map(fork),
        ...Object.values(userAddressSagas).map(fork),
    ]);
}

export default rootSaga;