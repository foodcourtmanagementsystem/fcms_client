import {takeLatest, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/foodCategory';
import axios from 'axios';


async function createFoodCategory(payload)
{
    const URL = `/api/FoodCategories`;
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workCreateFoodCategory(action)
{
    try
    {
        const data = yield call(createFoodCategory, action.payload);
        yield put({
            type: actionTypes.CREATE_FOOD_CATEGORY_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CREATE_FOOD_CATEGORY_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchCreateFoodCategory()
{
    yield takeLatest(actionTypes.CREATE_FOOD_CATEGORY, workCreateFoodCategory);
}


async function listFoodCategory()
{
    const URL = `/api/FoodCategories`;
    const {data} = await axios.get(URL);
    return data;
}

function* workListFoodCategory(action)
{
    try
    {
        const data = yield call(listFoodCategory);
        yield put({
            type: actionTypes.LIST_FOOD_CATEGORY_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.LIST_FOOD_CATEGORY_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchListFoodCategory()
{
    yield takeLatest(actionTypes.LIST_FOOD_CATEGORY, workListFoodCategory);
}



async function getFoodCategory(payload)
{
    const {id} = payload;
    const URL = `/api/FoodCategories/${id}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workGetFoodCategory(action)
{
    try
    {
        const data = yield call(getFoodCategory, action.payload);
        yield put({
            type: actionTypes.GET_FOOD_CATEGORY_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_FOOD_CATEGORY_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchGetFoodCategory()
{
    yield takeLatest(actionTypes.GET_FOOD_CATEGORY, workGetFoodCategory);
}


async function editFoodCategory(payload)
{
    const URL = `/api/FoodCategories/${payload.id}`;
    const {data} = await axios.put(URL, payload);
    return data;
}

function* workEditFoodCategory(action)
{
    try
    {
        const data = yield call(editFoodCategory, action.payload);
        yield put({
            type: actionTypes.EDIT_FOOD_CATEGORY_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.EDIT_FOOD_CATEGORY_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchEditFoodCategory()
{
    yield takeLatest(actionTypes.EDIT_FOOD_CATEGORY, workEditFoodCategory);
}


async function deleteFoodCategory(payload)
{
    const URL = `/api/FoodCategories/${payload.id}`;
    await axios.delete(URL);
}

function* workDeleteFoodCategory(action)
{
    try
    {
        yield call(deleteFoodCategory, action.payload);
        yield put({
            type: actionTypes.DELETE_FOOD_CATEGORY_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_FOOD_CATEGORY_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchDeleteFoodCategory()
{
    yield takeLatest(actionTypes.DELETE_FOOD_CATEGORY, workDeleteFoodCategory);
}

