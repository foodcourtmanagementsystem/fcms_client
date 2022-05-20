import './Payment.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Card from '../components/Card';
import PaymentSummary from '../components/PaymentSummary';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';

function Payment() {
  const user = useSelector(state => state.user.data); 
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector(state => state.cartItem.data);
  const makePayment = useSelector(state => state.payment.make);

  useEffect(() => {
    if(!user.isAuthenticated)
    {
      navigate(`/user/signin?returnUrl=${location.pathname}`)
    }
    else if(!user.address)
    {
      navigate(`/user/profile?returnUrl=${location.pathname}`);
    }

  }, [user.isAuthenticated, location.pathname]);


  useEffect(() => {
    if(makePayment.success)
    {
      navigate(`/orderandhistory`);
    }

  }, [makePayment.success]);

  useEffect(() => {
    if(cartItems.length < 1)
    {
      navigate('/');
    }

  }, [cartItems.length]);


  if(!user.isAuthenticated)
  {
    return null;
  }

  return (
    <div className="payment">
        <div className="payment__right">
          <PaymentSummary />
       </div>
       <div className="payment__left">
          <Card />
          {makePayment.loading && <Loading />}
          {makePayment.error && <Error error={makePayment.error} />}
       </div>
    </div>
  );
}

export default Payment;