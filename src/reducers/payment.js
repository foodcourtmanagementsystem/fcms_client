import initialState from "../initialStates/payment";
import * as actionTypes from '../actionTypes/payment';

function reducer(state=initialState, action)
{
    switch(action.type)
    {
        case actionTypes.PAYMENT_INITIAL_STATE:
            return initialState;
        
        case actionTypes.MAKE_PAYMENT_LOADING:
            return ({
                ...state,
                make: {
                    loading: true
                }
            });
        case actionTypes.MAKE_PAYMENT_SUCCESS:
            return ({
                ...state,
                make: {
                    success: true
                }
            });
        case actionTypes.MAKE_PAYMENT_ERROR:
            return ({
                ...state,
                make: {
                    error: action.payload
                }
            });
        case actionTypes.MAKE_PAYMENT_INITIAL_STATE:
            return ({
                ...state,
                make: initialState.make
            });


        default:
            return state;
    }
}

export default reducer;