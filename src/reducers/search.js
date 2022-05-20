import initialState from '../initialStates/search';
import * as actionTypes from '../actionTypes/search';

function reducer(state=initialState, action)
{
    switch(action.type)
    {
        case actionTypes.SEARCH_INITIAL_STATE:
            return initialState;

        case actionTypes.SEARCH_RESULT_LOADING:
            return ({
                ...state,
                result: {
                    loading: true
                }
            });
        case actionTypes.SEARCH_RESULT_SUCCESS:
            return ({
                ...state,
                data: action.payload,
                result: {
                    success: true
                }
            });
        case actionTypes.SEARCH_RESULT_ERROR:
            return ({
                ...state,
                result: {
                    error: action.payload
                }
            });
        case actionTypes.SEARCH_RESULT_INITIAL_STATE:
            return ({
                ...state,
                result: initialState.result
            });
        
        default:
            return state;
    }
}

export default reducer;