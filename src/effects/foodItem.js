import {takeLatest, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/foodItem';
import axios from 'axios';


async function createFoodItem(payload)
{
    const URL = `/api/FoodItems`;
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workCreateFoodItem(action)
{
    try
    {
        const data = yield call(createFoodItem, action.payload);
        yield put({
            type: actionTypes.CREATE_FOOD_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CREATE_FOOD_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchCreateFoodItem()
{
    yield takeLatest(actionTypes.CREATE_FOOD_ITEM, workCreateFoodItem);
}


async function listFoodItem()
{
    const URL = `/api/FoodItems`;
    const {data} = await axios.get(URL);
    return data;
}

function* workListFoodItem(action)
{
    try
    {
        const data = yield call(listFoodItem);
        yield put({
            type: actionTypes.LIST_FOOD_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.LIST_FOOD_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchListFoodItem()
{
    yield takeLatest(actionTypes.LIST_FOOD_ITEM, workListFoodItem);
}



async function getFoodItem(payload)
{
    const {id} = payload;
    const URL = `/api/FoodItems/${id}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workGetFoodItem(action)
{
    try
    {
        const data = yield call(getFoodItem, action.payload);
        yield put({
            type: actionTypes.GET_FOOD_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_FOOD_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchGetFoodItem()
{
    yield takeLatest(actionTypes.GET_FOOD_ITEM, workGetFoodItem);
}

async function editFoodItem(payload)
{
    const URL = `/api/FoodItems/${payload.id}`;
    const {data} = await axios.put(URL, payload);
    return data;
}

function* workEditFoodItem(action)
{
    try
    {
        const data = yield call(editFoodItem, action.payload);
        yield put({
            type: actionTypes.EDIT_FOOD_ITEM_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.EDIT_FOOD_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchEditFoodItem()
{
    yield takeLatest(actionTypes.EDIT_FOOD_ITEM, workEditFoodItem);
}


async function deleteFoodItem(payload)
{
    const URL = `/api/FoodItems/${payload.id}`;
    await axios.delete(URL);
}

function* workDeleteFoodItem(action)
{
    try
    {
        yield call(deleteFoodItem, action.payload);
        yield put({
            type: actionTypes.DELETE_FOOD_ITEM_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_FOOD_ITEM_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchDeleteFoodItem()
{
    yield takeLatest(actionTypes.DELETE_FOOD_ITEM, workDeleteFoodItem);
}

