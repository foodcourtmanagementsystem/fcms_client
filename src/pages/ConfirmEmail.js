import './ConfirmEmail.css';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import Success from '../components/styled/Success';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import * as userActionTypes from '../actionTypes/user';

function ConfirmEmail() {
  const confirmEmail = useSelector(state => state.user.confirmEmail);
  const user = useSelector(state => state.user.data);
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {

      if(Object.keys(confirmEmail).length === 0 && params.userId && searchParams.get("validator"))
      {
        dispatch({
            type: userActionTypes.CONFIRM_EMAIL_USER_LOADING
        });
        dispatch({
            type: userActionTypes.CONFIRM_EMAIL_USER,
            payload: {
                userId: params.userId,
                validator: searchParams.get("validator")
            }
        }); 
      }
     

  }, [params.userId, searchParams, confirmEmail]);

  useEffect(() => {
      if(user.isAuthenticated && user.roles.includes("Admin"))
      {
          navigate(`/user/${user.id}/dashboard`);
      }
      
  }, [user.isAuthenticated, user.roles, user.id]);

  return (
    <div className="confirm-email">
        {confirmEmail.success && <Success success={"Your email is confirmed successfully."} />}
        {confirmEmail.loading && <Loading />} 
        {confirmEmail.error && <Error error={confirmEmail.error} />} 
    </div>
  );
}

export default ConfirmEmail;