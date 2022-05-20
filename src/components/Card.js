import './Card.css';
import {loadStripe} from '@stripe/stripe-js';
import * as settings from '../config/settings';
import {Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import * as paymentActionTypes from '../actionTypes/payment';
import {useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';

const stripePromise = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);


const CheckOutForm = () => {

    const stripe = useStripe(); 
    const elements = useElements();
    const dispatch = useDispatch();

    const initialValues = {
        isValidCardNumber: false,
        isValidCardExpiry : false,
        isValidCardCvc : false 
    };

    const [values, setValues] = useState(initialValues);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        if(values.isValidCardNumber && values.isValidCardExpiry && values.isValidCardCvc)
        {
            setIsValid(true);
        }
        else
        {
            setIsValid(false);
        }

    }, [values]);
    
    const handleChange = e => {
    
        if(e.elementType === 'cardNumber')
        {
            if(e.empty || e.error || !e.complete)
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardNumber: false
                }));
            }
            else
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardNumber: true
                }));
            }
        }
        else if(e.elementType === 'cardExpiry')
        {
            if(e.empty || e.error || !e.complete)
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardExpiry: false
                }));
            }
            else
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardExpiry: true
                }));
            }
        }
        else if(e.elementType === 'cardCvc')
        {
            if(e.empty || e.error || !e.complete)
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardCvc: false
                }));
            }
            else
            {
                setValues(prevValues => ({ 
                    ...prevValues,
                    isValidCardCvc: true
                }));
            }
        }

    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(!stripe || !elements || !isValid) return;

        dispatch({
            type: paymentActionTypes.MAKE_PAYMENT_LOADING
        });
        dispatch({ 
            type: paymentActionTypes.MAKE_PAYMENT,
            payload: {
                stripe, 
                elements
            }
        });

    }


    return (
        <form className="check-out__form" onSubmit={handleSubmit}>
            <div className="card-element__wrapper">
                <label className="card-element__label">Card Number</label>
                <CardNumberElement options={{
                        showIcon: true,
                    }} 

                    onChange = {handleChange}
                />
            </div> 
            <div className="check-out__form-input-group">
                <div className="card-element__wrapper">
                    <label className="card-element__label">Card Expiry</label>
                    <CardExpiryElement onChange={handleChange} />
                </div>
                <div className="card-element__wrapper">
                    <label className="card-element__label">Card CVC</label>
                    <CardCvcElement onChange={handleChange} />
                </div>
            </div>
            <div className='check-out__form-btn-container'>
                <button className="check-out__form-btn" disabled={!stripe || !elements || !isValid}>Pay</button>
            </div>
        </form>
    );
}

function Card() {
  return (
    <div className="card" >
        <Elements stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    </div>
  );
}

export default Card;