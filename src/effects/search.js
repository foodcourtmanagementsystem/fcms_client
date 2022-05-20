import {takeLatest, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/search';
import axios from 'axios';

async function searchResult(payload)
{
    const {query} = payload;
    const URL = `/api/Search?query=${query}`;
    const {data} = await axios.get(URL);
    return data;
}

function* workSearchResult(action)
{
    try
    {
        const data = yield call(searchResult, action.payload);
        yield put({
            type: actionTypes.SEARCH_RESULT_SUCCESS,
            payload: data
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.SEARCH_RESULT_ERROR,
            payload: err.message
        });
    }
}

export function* watchSearchResult()
{
    yield takeLatest(actionTypes.SEARCH_RESULT, workSearchResult);
}