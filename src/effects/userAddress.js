import {takeLatest, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/userAddress';
import axios from 'axios';
import * as userActionTypes from '../actionTypes/user';

async function createUserAddress(payload)
{
    const URL = `/api/UserAddress`;
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workCreateUserAddress(action)
{
    try
    {
        const data = yield call(createUserAddress, action.payload);
        yield put({
            type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
            payload: data
        });
        yield put({
            type: userActionTypes.UPDATE_USER_ADDRESS_DATA,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CREATE_USER_ADDRESS_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchCreateUserAddress()
{
    yield takeLatest(actionTypes.CREATE_USER_ADDRESS, workCreateUserAddress);
}

/*

async function listUserAddress()
{
    const URL = `/api/UserAddresses`;
    const {data} = await axios.get(URL);
    return data;
}

function* workListUserAddress(action)
{
    try
    {
        const data = yield call(listUserAddress);
        yield put({
            type: actionTypes.LIST_USER_ADDRESS_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.LIST_USER_ADDRESS_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchListUserAddress()
{
    yield takeLatest(actionTypes.LIST_USER_ADDRESS, workListUserAddress);
}
*/


async function getUserAddress(payload)
{
    const {id} = payload;
    const URL = `/api/UserAddress/${id}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workGetUserAddress(action)
{
    try
    {
        const data = yield call(getUserAddress, action.payload);
        yield put({
            type: actionTypes.GET_USER_ADDRESS_SUCCESS,
            payload: data
        });
        
        yield put({
            type: userActionTypes.UPDATE_USER_ADDRESS_DATA,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_USER_ADDRESS_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchGetUserAddress()
{
    yield takeLatest(actionTypes.GET_USER_ADDRESS, workGetUserAddress);
}


async function editUserAddress(payload)
{
    const URL = `/api/UserAddress/${payload.id}`;
    const {data} = await axios.put(URL, payload);
    return data;
}

function* workEditUserAddress(action)
{
    try
    {
        const data = yield call(editUserAddress, action.payload);
        yield put({
            type: actionTypes.EDIT_USER_ADDRESS_SUCCESS,
            payload: data
        });
        yield put({
            type: userActionTypes.UPDATE_USER_ADDRESS_DATA,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.EDIT_USER_ADDRESS_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchEditUserAddress()
{
    yield takeLatest(actionTypes.EDIT_USER_ADDRESS, workEditUserAddress);
}


async function deleteUserAddress(payload)
{
    const URL = `/api/UserAddress/${payload.id}`;
    await axios.delete(URL);
}

function* workDeleteUserAddress(action)
{
    try
    {
        yield call(deleteUserAddress, action.payload);
        yield put({
            type: actionTypes.DELETE_USER_ADDRESS_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
        yield put({
            type: userActionTypes.UPDATE_USER_ADDRESS_DATA,
            payload: null
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_USER_ADDRESS_ERROR,
            payload: err.response?.data?.error ?? err.message
        });
    }
}

export function* watchDeleteUserAddress()
{
    yield takeLatest(actionTypes.DELETE_USER_ADDRESS, workDeleteUserAddress);
}

