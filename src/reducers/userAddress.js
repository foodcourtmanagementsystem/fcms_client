import initialState from "../initialStates/userAddress";
import * as actionTypes from '../actionTypes/userAddress';

function reducer(state=initialState, action)
{
    switch(action.type)
    {
        case actionTypes.USER_ADDRESS_INITIAL_STATE:
            return initialState;
        
        case actionTypes.CREATE_USER_ADDRESS_LOADING:
            return ({
                ...state,
                create: {
                    loading: true
                }
            });
        case actionTypes.CREATE_USER_ADDRESS_SUCCESS:
            return ({
                ...state,
                create: {
                    success: true
                }
            });
        case actionTypes.CREATE_USER_ADDRESS_ERROR:
            return ({
                ...state,
                create: {
                    error: action.payload
                }
            });
        case actionTypes.CREATE_USER_ADDRESS_INITIAL_STATE:
            return ({
                ...state,
                create: initialState.create
            });

        
        case actionTypes.GET_USER_ADDRESS_SUCCESS:
            return ({
                ...state,
                get: {
                    success: true
                }
            });
        case actionTypes.GET_USER_ADDRESS_ERROR:
            return ({
                ...state,
                get: {
                    error: action.payload
                }
            });
        case actionTypes.GET_USER_ADDRESS_INITIAL_STATE:
            return ({
                ...state,
                get: initialState.get
            });
        
        case actionTypes.EDIT_USER_ADDRESS_DATA:
            return ({
                ...state,
                edit: {
                    data: action.payload
                }
            });
        case actionTypes.EDIT_USER_ADDRESS_LOADING:
            return ({
                ...state,
                edit: {
                    data: state.edit.data,
                    loading: true
                }
            });
        case actionTypes.EDIT_USER_ADDRESS_SUCCESS:
            return ({
                ...state,
                edit: {
                    data: state.edit.data,
                    success: true
                }
            });
        case actionTypes.EDIT_USER_ADDRESS_ERROR:
            return ({
                ...state,
                edit: {
                    data: state.edit.data,
                    error: action.payload
                }
            });
        case actionTypes.EDIT_USER_ADDRESS_INITIAL_STATE:
            return ({
                ...state,
                edit: initialState.edit
            });
        
        case actionTypes.DELETE_USER_ADDRESS_DATA:
            return ({
                ...state,
                delete: {
                    data: action.payload
                }
            });
        case actionTypes.DELETE_USER_ADDRESS_LOADING:
            return ({
                ...state,
                delete: {
                    data: state.delete.data,
                    loading: true
                }
            });
        case actionTypes.DELETE_USER_ADDRESS_ERROR:
            return ({
                ...state,
                delete: {
                    data: state.delete.data,
                    error: action.payload
                }
            });
        case actionTypes.DELETE_USER_ADDRESS_SUCCESS:
            return ({
                ...state,
                delete: {
                    data: state.delete.data,
                    success: true
                }
            });
        case actionTypes.DELETE_USER_ADDRESS_INITIAL_STATE:
            return ({
                ...state,
                delete: initialState.delete
            });

        default:
            return state;
    }
}

export default reducer;