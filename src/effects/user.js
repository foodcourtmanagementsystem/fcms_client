import { takeLatest, call, put } from "redux-saga/effects";
import * as actionTypes from '../actionTypes/user';
import axios from 'axios';

async function signUpUser(payload)
{
    const URL = "/api/Account/Register";
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workSignUpUser(action)
{
    try
    {
        const data = yield call(signUpUser, action.payload);   
        yield put({
            type: actionTypes.SIGN_UP_USER_SUCCESS,
            payload: data
        }); 
    }
    catch(err)
    {
        if(typeof err.response.data?.error === 'object' && err.response.data.error[1]?.code === "DuplicateEmail")
        {
            yield put({
                type: actionTypes.SIGN_UP_USER_ERROR,
                payload: err.response.data.error[1].description
            });
        }
        else
        {
            yield put({
                type: actionTypes.SIGN_UP_USER_ERROR,
                payload: err.message
            });
        }
     
    }
}

export function* watchSignUpUser()
{
    yield takeLatest(actionTypes.SIGN_UP_USER, workSignUpUser);
}


async function confirmEmailuser(payload)
{
    const {userId, validator} = payload;
    const URL = `/api/Account/ConfirmEmail/${userId}?validator=${validator}`;
    const {data} = await axios.get(URL);
    return ({
        isAuthenticated: true,
        ...data.user
    });
}

function* workConfirmEmailUser(action)
{
    try
    {
        const data = yield call(confirmEmailuser, action.payload);
        yield put({
            type: actionTypes.CONFIRM_EMAIL_USER_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CONFIRM_EMAIL_USER_ERROR,
            payload: err.response?.data?.error && err.message
        });
    }
}


export function* watchConfirmEmailUser()
{
    yield takeLatest(actionTypes.CONFIRM_EMAIL_USER, workConfirmEmailUser);
}

async function signInUser(payload)
{
    const URL = "/api/Account/Login";
    const {data} = await axios.post(URL, payload);
    return ({
                isAuthenticated: true,
                ...data.user
            });
}

function* workSignInUser(action)
{
    try
    {
        const data = yield call(signInUser, action.payload);
        yield put({
            type: actionTypes.SIGN_IN_USER_SUCCESS,
            payload: data
        });   
    }
    catch(err)
    {
        yield put({
            type: actionTypes.SIGN_IN_USER_ERROR,
            payload: "Try again!"
        });
    }
}

export function* watchSignInUser()
{
    yield takeLatest(actionTypes.SIGN_IN_USER, workSignInUser);
}

async function getUser()
{
    const URL = "/api/Account/Profile";
    const {data} = await axios.get(URL);
    return ({
            isAuthenticated: true,
            ...data.user
    });
}

function* workGetUser(action) {
    try
    {
        const data = yield call(getUser);
        yield put({
            type: actionTypes.GET_USER_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.GET_USER_ERROR,
            payload: err.response.data?.error ?? err.message
        });
    }
}

export function* watchGetUser()
{
    yield takeLatest(actionTypes.GET_USER, workGetUser);
}

async function signOutUser()
{
    const URL = "/api/Account/Logout";
    await axios.post(URL);
}

function* workSignOutUser(action)
{
    try
    {
        yield call(signOutUser);
        yield put({
            type: actionTypes.SIGN_OUT_USER_SUCCESS
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.SIGN_OUT_USER_ERROR,
            payload: err.response?.data.error && err.message
        });
    }
}

export function* watchSignOutUser()
{
    yield takeLatest(actionTypes.SIGN_OUT_USER, workSignOutUser);
}


async function resetPassword(payload)
{
    const URL = "/api/Account/ResetPassword";
    await axios.post(URL, payload);
}

function* workResetPassword(action) 
{
    try
    {
        yield call(resetPassword, action.payload);
        yield put({
            type: actionTypes.RESET_PASSWORD_USER_SUCCESS
        });
    }
    catch(err)
    {
            
        yield put({
                type: actionTypes.RESET_PASSWORD_USER_ERROR,
                payload: err.response.data?.error ?? err.message
            });
    }
}

export function* watchResetPassword()
{
    yield takeLatest(actionTypes.RESET_PASSWORD_USER, workResetPassword);
}


async function confirmResetPassword(payload)
{
    const {userId, validator, newPassword} = payload;
    const URL = `/api/Account/ConfirmResetPassword/${userId}?validator=${validator}`;
    await axios.post(URL, {
        newPassword: newPassword
    });
}

function* workConfirmResetPassword(action) 
{
    try
    {
        yield call(confirmResetPassword, action.payload);
        yield put({
            type: actionTypes.CONFIRM_RESET_PASSWORD_USER_SUCCESS
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CONFIRM_RESET_PASSWORD_USER_ERROR,
            payload: err.response.data?.error ?? err.message
        });
    }
}

export function* watchConfirmResetPassword()
{
    yield takeLatest(actionTypes.CONFIRM_RESET_PASSWORD_USER, workConfirmResetPassword);
}

async function updateUserFullName(payload)
{
    const URL = "/api/Account/UpdateUserFullName";
    const {data} = await axios.post(URL, payload);
    return data;
}

function* workUpdateUserFullName(action)
{
    try
    {
        const data = yield call(updateUserFullName, action.payload);
        yield put({
            type: actionTypes.UPDATE_USER_FULL_NAME_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.UPDATE_USER_FULL_NAME_ERROR,
            payload: err.response?.data?.error && err.message
        });
    }

}

export function* watchUpdateUserFullName()
{
    yield takeLatest(actionTypes.UPDATE_USER_FULL_NAME, workUpdateUserFullName);
}

async function changePasswordUser(payload)
{
    const URL  = "/api/Account/ChangePassword";
    await axios.post(URL, payload);        
}

function* workChangePasswordUser(action)
{
    try
    {
        yield call(changePasswordUser, action.payload);
        yield put({
            type: actionTypes.CHANGE_PASSWORD_USER_SUCCESS
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.CHANGE_PASSWORD_USER_ERROR,
            payload: err.message
        });
    }
}

export function* watchChangePasswordUser()
{
    yield takeLatest(actionTypes.CHANGE_PASSWORD_USER, workChangePasswordUser);
}