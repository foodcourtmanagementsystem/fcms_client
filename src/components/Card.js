import './Card.css';
import {loadStripe} from '@stripe/stripe-js';
import * as settings from '../config/settings';
import {Elements, useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);


const CheckOutForm = () => {

    const stripe = useStripe(); 
    const elements = useElements();

    const handleSubmit = async e => {
        e.preventDefault();

        if(!stripe || !elements) return;

        try 
        {
            const URL = "/api/Payments/CreatePaymentIntent";
            const {data} = await axios.post(URL);
            const {clientSecret} = data;

            const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if(!stripeError) {
                console.log(`Payment intent: ${paymentIntent.id}`);
            }
            else
            {
                console.log(stripeError.message);
            }

        }
        catch(err){ }

    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{
                hidePostalCode: true
            }} />
            <button disabled={!stripe || !elements}>Pay</button>
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