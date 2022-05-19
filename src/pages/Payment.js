import './Payment.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Card from '../components/Card';;

function Payment() {
  const user = useSelector(state => state.user.data); 
  const navigate = useNavigate();
  const location = useLocation();

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


  if(!user.isAuthenticated)
  {
    return null;
  }

  return (
    <div className="payment">
          <Card />
    </div>
  );
}

export default Payment;