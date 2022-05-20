import {takeLatest, call, put} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/payment';
import axios from 'axios';
import {CardNumberElement} from '@stripe/react-stripe-js'; 

async function makePayment(payload)
{
    const {stripe, elements} = payload;
    const URL = "/api/Payments/CreatePaymentIntent";
    const {data} = await axios.post(URL);
    const {clientSecret} = data;
    
    const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardNumberElement)
        }
    });

    return ({error, paymentIntent});
}

function* workMakePayment(action)
{
    try
    {
        yield call(makePayment, action.payload);
        yield put({
            type: actionTypes.MAKE_PAYMENT_SUCCESS
        });
    }
    catch(err)
    {
        yield put({
            type: actionTypes.MAKE_PAYMENT_ERROR,
            payload: err.message
        });
    }
}

export function* watchMakePayment()
{
    yield takeLatest(actionTypes.MAKE_PAYMENT, workMakePayment);
}