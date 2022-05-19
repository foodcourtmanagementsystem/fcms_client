import initialState from '../initialStates/file';
import * as actionTypes from '../actionTypes/file';

function reducer(state=initialState, action)
{
    switch(action.type)
    {
        case actionTypes.UPLOAD_FILE_PROGRESS:
            return ({
                ...state, 
                upload: {
                    ...state.upload,
                    progress: {
                        ...state.upload.progress,
                        [action.payload.id]: action.payload.percentage
                    }
                }
            });
        case actionTypes.UPLOAD_FILE_SUCCESS:
            return ({
                ...state, 
                upload: {
                    ...state.upload,
                    success: {
                        ...state.upload.success,
                        [action.payload.id]: action.payload.path
                    }
                }
            });
        case actionTypes.UPLOAD_FILE_ERROR:
            return ({
                ...state, 
                upload: {
                    ...state.upload,
                    error: {
                        ...state.upload.error,
                        [action.payload.id]: action.payload.error
                    }
                }
            });
        case actionTypes.UPLOAD_FILE_INITIAL_STATE:
            return ({
                ...state, 
                upload: initialState.upload
            });

        case actionTypes.DELETE_FILE_LOADING:
            return ({
                ...state, 
                delete: {
                    ...state.delete,
                    loading: {
                        ...state.delete.loading,
                        [action.payload.id]: true
                    }
                }
            });
        case actionTypes.DELETE_FILE_SUCCESS:
            return ({
                ...state, 
                delete: {
                    ...state.delete,
                    success: {
                        ...state.delete.success,
                        [action.payload.id]: true
                    }
                }
            });
        case actionTypes.DELETE_FILE_ERROR:
            return ({
                ...state, 
                delete: {
                    ...state.delete,
                    error: {
                        ...state.delete.error,
                        [action.payload.id]: action.payload.error
                    }
                }
            });
        case actionTypes.DELETE_FILE_INITIAL_STATE:
            return ({
                ...state, 
                delete: initialState.delete
            });

        default:
            return state;
    }
}

export default reducer;