import {takeEvery, call, put, cancelled, take} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/file';
import axios from 'axios';
import { eventChannel } from 'redux-saga';

function uploadFile(payload)
{
    return eventChannel(emit => {
        (async function ()
        {
            try
            {
                const {URL, name, file, id} = payload; 
                const fd = new FormData();
                fd.append("file", file);
                const {data} = await axios.post(URL, fd, {
                    onUploadProgress: e => {
                        const percentage = Math.round((e.loaded * 100) / e.total);

                            emit({
                                type: actionTypes.UPLOAD_FILE_PROGRESS,
                                payload: {
                                    id,
                                    percentage
                                }
                            });
                    
                    }
                });

                emit({
                    type: actionTypes.UPLOAD_FILE_SUCCESS,
                    payload: {
                        id,
                        path: data.path
                    }
                });
            }
            catch(err)
            {
           
                emit({
                    type: actionTypes.UPLOAD_FILE_ERROR,
                    payload: {
                        id: payload.id,
                        error: err.response?.data?.message ?? err.message 
                    }
                });
            }
        })();

        return () => {};
    });
   
}

function* workUploadFile(action)
{
    const chann = yield call(uploadFile, action.payload);
    try 
    {
        while(true)
        {
            const action = yield take(chann);
            yield put(action);
        }
    }
    finally
    {
        if(yield cancelled())
        {
            chann.close();
        }
    } 
}

export function* watchUploadFile()
{
    yield takeEvery(actionTypes.UPLOAD_FILE, workUploadFile);    
}

async function deleteFile(payload)
{
    const {URL, path} = payload;
    await axios.post(URL, {path});
}

function* workDeleteFile(action)
{
    try 
    {
        yield call(deleteFile, action.payload);
        yield put({
            type: actionTypes.DELETE_FILE_SUCCESS,
            payload: {
                id: action.payload.id
            }
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.DELETE_FILE_ERROR,
            payload: {
                id: action.payload.id,
                error: err.response?.data?.error ?? err.message
            }
        });
    }
}

export function* watchDeleteFile()
{
    yield takeEvery(actionTypes.DELETE_FILE, workDeleteFile);   
}