import {takeLatest, put, call, select} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/orderItem';
import axios from 'axios';


async function createOrderItem(payload)
{
    const URL = `/api/OrderItems`;
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workCreateOrderItem(action)
{
    try
    {
        const data = yield call(createOrderItem, action.payload);
        yield put({
            type: actionTypes.CREATE_ORDER_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CREATE_ORDER_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchCreateOrderItem()
{
    yield takeLatest(actionTypes.CREATE_ORDER_ITEM, workCreateOrderItem);
}


async function listOrderItem(payload)
{
    const {URL} = payload;
    const {data} = await axios.get(URL);
    return data;
}

function* workListOrderItem(action)
{
    try
    {
        const data = yield call(listOrderItem, action.payload);
        yield put({
            type: actionTypes.LIST_ORDER_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.LIST_ORDER_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchListOrderItem()
{
    yield takeLatest(actionTypes.LIST_ORDER_ITEM, workListOrderItem);
}



async function getOrderItem(payload)
{
    const {id} = payload;
    const URL = `/api/OrderItems/${id}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workGetOrderItem(action)
{
    try
    {
        const data = yield call(getOrderItem, action.payload);
        yield put({
            type: actionTypes.GET_ORDER_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_ORDER_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchGetOrderItem()
{
    yield takeLatest(actionTypes.GET_ORDER_ITEM, workGetOrderItem);
}


async function editOrderItem(payload)
{
    const URL = `/api/OrderItems/${payload.id}`;
    const {data} = await axios.put(URL, payload);
    return data;
}

function* workEditOrderItem(action)
{
    try
    {
        const data = yield call(editOrderItem, action.payload);
        yield put({
            type: actionTypes.EDIT_ORDER_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.EDIT_ORDER_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchEditOrderItem()
{
    yield takeLatest(actionTypes.EDIT_ORDER_ITEM, workEditOrderItem);
}


async function deleteOrderItem(payload)
{
    const URL = `/api/OrderItems/${payload.id}`;
    await axios.delete(URL);
}

function* workDeleteOrderItem(action)
{
    try
    {
        yield call(deleteOrderItem, action.payload);
        yield put({
            type: actionTypes.DELETE_ORDER_ITEM_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_ORDER_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchDeleteOrderItem()
{
    yield takeLatest(actionTypes.DELETE_ORDER_ITEM, workDeleteOrderItem);
}

