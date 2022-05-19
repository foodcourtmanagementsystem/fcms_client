import {takeLatest, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/cartItem';
import axios from 'axios';


async function createCartItem(payload)
{
    const URL = `/api/CartItems`;
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workCreateCartItem(action)
{
    try
    {
        const data = yield call(createCartItem, action.payload);
        yield put({
            type: actionTypes.CREATE_CART_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CREATE_CART_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchCreateCartItem()
{
    yield takeLatest(actionTypes.CREATE_CART_ITEM, workCreateCartItem);
}


async function listCartItem()
{
    const URL = `/api/CartItems`;
    const {data} = await axios.get(URL);
    return data;
}

function* workListCartItem(action)
{
    try
    {
        const data = yield call(listCartItem);
        yield put({
            type: actionTypes.LIST_CART_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.LIST_CART_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchListCartItem()
{
    yield takeLatest(actionTypes.LIST_CART_ITEM, workListCartItem);
}



async function getCartItem(payload)
{
    const {id} = payload;
    const URL = `/api/CartItems/${id}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workGetCartItem(action)
{
    try
    {
        const data = yield call(getCartItem, action.payload);
        yield put({
            type: actionTypes.GET_CART_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_CART_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchGetCartItem()
{
    yield takeLatest(actionTypes.GET_CART_ITEM, workGetCartItem);
}


async function editCartItem(payload)
{
    const URL = `/api/CartItems/${payload.id}`;
    const {data} = await axios.put(URL, payload);
    return data;
}

function* workEditCartItem(action)
{
    try
    {
        const data = yield call(editCartItem, action.payload);
        yield put({
            type: actionTypes.EDIT_CART_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.EDIT_CART_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchEditCartItem()
{
    yield takeLatest(actionTypes.EDIT_CART_ITEM, workEditCartItem);
}


async function deleteCartItem(payload)
{
    const URL = `/api/CartItems/${payload.id}`;
    await axios.delete(URL);
}

function* workDeleteCartItem(action)
{
    try
    {
        yield call(deleteCartItem, action.payload);
        yield put({
            type: actionTypes.DELETE_CART_ITEM_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_CART_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchDeleteCartItem()
{
    yield takeLatest(actionTypes.DELETE_CART_ITEM, workDeleteCartItem);
}

