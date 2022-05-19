import initialState from '../initialStates/user';
import * as actionTypes from '../actionTypes/user';


function reducer(state=initialState, action)
{

    switch(action.type)
    {
        case actionTypes.USER_INITIAL_STATE:
            return initialState;
        
        case actionTypes.SIGN_UP_USER_LOADING:
            return ({
                ...state, 
                signUp: {
                    loading: true
                }
            });
        case actionTypes.SIGN_UP_USER_SUCCESS:
            return ({
                ...state, 
                signUp: {
                    success: true
                }
            });
        case actionTypes.SIGN_UP_USER_ERROR:
            return ({
                ...state, 
                signUp: {
                    error: action.payload
                }
            });
        case actionTypes.SIGN_UP_USER_INITIAL_STATE:
            return ({
                ...state, 
                signUp: initialState.signUp
            });

        case actionTypes.CONFIRM_EMAIL_USER_LOADING:
            return ({
                ...state, 
                confirmEmail: {
                    loading: true
                }
            });
        case actionTypes.CONFIRM_EMAIL_USER_SUCCESS:
            return ({
                ...state,
                data: action.payload, 
                confirmEmail: {
                    success: true
                }
            });
        case actionTypes.CONFIRM_EMAIL_USER_ERROR:
            return ({
                ...state,
                confirmEmail: {
                    error: action.payload
                }
            });
        case actionTypes.CONFIRM_EMAIL_USER_INITIAL_STATE:
            return ({
                ...state,
                confirmEmail: initialState.confirmEmail
            });
        
        case actionTypes.SIGN_IN_USER_LOADING:
            return ({
                ...state, 
                signIn: {
                    loading: true
                }
            });
        case actionTypes.SIGN_IN_USER_SUCCESS:
            return ({
                ...state, 
                data: action.payload,
                signIn: {
                    success: true
                }
            });
        case actionTypes.SIGN_IN_USER_ERROR:
            return ({
                ...state, 
                signIn: {
                    error: action.payload
                }
            });
        case actionTypes.SIGN_IN_USER_INITIAL_STATE:
            return ({
                ...state, 
                signIn: initialState.signIn
            });

        case actionTypes.GET_USER_LOADING:
            return ({
                ...state,
                get: {
                    loading: true
                }
            });
        case actionTypes.GET_USER_SUCCESS:
            return ({
                ...state,
                data: action.payload,
                get: {
                    success: true
                }
            });
        case actionTypes.GET_USER_ERROR:
            return ({
                ...state,
                data: {
                    isAuthenticated: false
                },
                get: {
                    error: action.payload
                }
            });
        case actionTypes.GET_USER_INITIAL_STATE:
            return ({
                ...state,
                get: initialState.get
            });
        
        case actionTypes.UPDATE_USER_LOADING:
            return ({
                ...state,
                update: {
                    loading: true
                }
            });
        case actionTypes.UPDATE_USER_SUCCESS:
            return ({
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                },
                update: {
                    success: true
                }
            });
        case actionTypes.UPDATE_USER_ERROR:
            return ({
                ...state,
                update: {
                    error: action.payload
                }
            });
        case actionTypes.UPDATE_USER_INITIAL_STATE:
            return ({
                ...state,
                update: initialState.update
            });
        
        case actionTypes.SIGN_OUT_USER_LOADING:
            return ({
                ...state,
                signOut: {
                    loading: true
                }
            });
        case actionTypes.SIGN_OUT_USER_SUCCESS:
            return ({
                ...state,
                data: {
                    isAuthenticated: false
                },
                signOut: {
                    success: true
                }
            });
        case actionTypes.SIGN_OUT_USER_ERROR:
            return ({
                ...state,
                signOut: {
                    error: action.payload
                }
            });
        case actionTypes.SIGN_OUT_USER_INITIAL_STATE:
            return ({
                ...state,
                signOut: initialState.signOut
            });

        case actionTypes.RESET_PASSWORD_USER_LOADING:
            return ({
                ...state,
                resetPassword: {
                    loading: true
                }
            });
        case actionTypes.RESET_PASSWORD_USER_SUCCESS:
            return ({
                ...state,
                resetPassword: {
                    success: true
                }
            });
        case actionTypes.RESET_PASSWORD_USER_ERROR:
            return ({
                ...state,
                resetPassword: {
                    error: action.payload
                }
            });
        case actionTypes.RESET_PASSWORD_USER_INITIAL_STATE:
            return ({
                ...state,
                resetPassword: initialState.resetPassword
            });

        case actionTypes.CONFIRM_RESET_PASSWORD_USER_LOADING:
            return ({
                ...state,
                confirmResetPassword: {
                    loading: true
                }
            });
        case actionTypes.CONFIRM_RESET_PASSWORD_USER_SUCCESS:
            return ({
                ...state,
                confirmResetPassword: {
                    success: true
                }
            });
        case actionTypes.CONFIRM_RESET_PASSWORD_USER_ERROR:
            return ({
                ...state,
                confirmResetPassword: {
                    error: action.payload
                }
            });
        case actionTypes.CONFIRM_RESET_PASSWORD_USER_INITIAL_STATE:
            return ({
                ...state,
                confirmResetPassword: initialState.confirmResetPassword
            });

        case actionTypes.UPDATE_USER_ADDRESS_DATA:
            return ({
                ...state,
                data: {
                    ...state.data, 
                    address: action.payload
                }
            });

        case actionTypes.UPDATE_USER_FULL_NAME_LOADING:
            return ({
                ...state, 
                updateUserFullName: {
                    loading: true
                }
            });
        case actionTypes.UPDATE_USER_FULL_NAME_SUCCESS:
            return ({
                ...state, 
                data: {
                    ...state.data, 
                    name: action.payload 
                },
                updateUserFullName: {
                    success: true
                }
            });
        case actionTypes.UPDATE_USER_FULL_NAME_ERROR:
            return ({
                ...state, 
                updateUserFullName: {
                    error: action.payload
                }
            });
        case actionTypes.UPDATE_USER_FULL_NAME_INITIAL_STATE:
            return ({
                ...state, 
                updateUserFullName: initialState.updateUserFullName
            });
        
        default:
            return state;
        
    }

}

export default reducer;