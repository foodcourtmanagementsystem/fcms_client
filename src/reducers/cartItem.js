import initialState from "../initialStates/cartItem";
import * as actionTypes from '../actionTypes/cartItem';

function reducer(state=initialState, action)
{
    switch(action.type)
    {
        case actionTypes.CART_ITEM_INITIAL_STATE:
            return initialState;
        
        case actionTypes.CREATE_CART_ITEM_LOADING:
            return ({
                ...state,
                create: {
                    loading: true
                }
            });
        case actionTypes.CREATE_CART_ITEM_SUCCESS:
            return ({
                ...state,
                data: [...state.data, action.payload],
                create: {
                    success: true
                }
            });
        case actionTypes.CREATE_CART_ITEM_ERROR:
            return ({
                ...state,
                create: {
                    error: action.payload
                }
            });
        case actionTypes.CREATE_CART_ITEM_INITIAL_STATE:
            return ({
                ...state,
                create: initialState.create
            });

        case actionTypes.LIST_CART_ITEM_LOADING:
            return ({
                ...state,
                list: {
                    loading: true
                }
            });
        case actionTypes.LIST_CART_ITEM_SUCCESS:
            return ({
                ...state,
                data: action.payload,
                list: {
                    success: true
                }
            });
        case actionTypes.LIST_CART_ITEM_ERROR:
            return ({
                ...state,
                list: {
                    error: action.payload
                }
            });
        case actionTypes.LIST_CART_ITEM_INITIAL_STATE:
            return ({
                ...state,
                list: initialState.list
            });

        case actionTypes.GET_CART_ITEM_LOADING:
            return ({
                ...state,
                get: {
                    loading: true
                }
            });
        case actionTypes.GET_CART_ITEM_SUCCESS:
            return ({
                ...state,
                get: {
                    data: action.payload,
                    success: true
                }
            });
        case actionTypes.GET_CART_ITEM_ERROR:
            return ({
                ...state,
                get: {
                    error: action.payload
                }
            });
        case actionTypes.GET_CART_ITEM_INITIAL_STATE:
            return ({
                ...state,
                get: initialState.get
            });
        
        case actionTypes.EDIT_CART_ITEM_DATA:
            return ({
                ...state,
                edit: {
                    data: action.payload
                }
            });
        case actionTypes.EDIT_CART_ITEM_LOADING:
            return ({
                ...state,
                edit: {
                    data: state.edit.data,
                    loading: true
                }
            });
        case actionTypes.EDIT_CART_ITEM_SUCCESS:
            return ({
                ...state,
                data: state.data.map(cartItem => {
                    if(cartItem.id === action.payload.id)
                    {
                        return action.payload;
                    }
                    return cartItem;
                }),
                edit: {
                    data: state.edit.data,
                    success: true
                }
            });
        case actionTypes.EDIT_CART_ITEM_ERROR:
            return ({
                ...state,
                edit: {
                    data: state.edit.data,
                    error: action.payload
                }
            });
        case actionTypes.EDIT_CART_ITEM_INITIAL_STATE:
            return ({
                ...state,
                edit: initialState.edit
            });
        
        case actionTypes.DELETE_CART_ITEM_DATA:
            return ({
                ...state,
                delete: {
                    data: action.payload
                }
            });
        case actionTypes.DELETE_CART_ITEM_LOADING:
            return ({
                ...state,
                delete: {
                    data: state.delete.data,
                    loading: true
                }
            });
        case actionTypes.DELETE_CART_ITEM_ERROR:
            return ({
                ...state,
                delete: {
                    data: state.delete.data,
                    error: action.payload
                }
            });
        case actionTypes.DELETE_CART_ITEM_SUCCESS:
            return ({
                ...state,
                data: state.data.filter(cartItem => cartItem.id !== action.payload.id),
                delete: {
                    data: state.delete.data,
                    success: true
                }
            });
        case actionTypes.DELETE_CART_ITEM_INITIAL_STATE:
            return ({
                ...state,
                delete: initialState.delete
            });

        default:
            return state;
    }
}

export default reducer;