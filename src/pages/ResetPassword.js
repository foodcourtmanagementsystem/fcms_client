import {useState, useRef, useEffect} from 'react';
import './ResetPassword.css';
import TextInput from '../components/styled/TextInput';
import {NavLink} from 'react-router-dom';
import * as regex from '../utils/regex';
import {useSelector, useDispatch} from 'react-redux';
import * as userActionTypes from '../actionTypes/user';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import Success from '../components/styled/Success';
import {useNavigate} from 'react-router-dom';


function ResetPassword() {

  const initialValues = {
    email: ""
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const resetPassword = useSelector(state => state.user.resetPassword);
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);


  useEffect(() => {
    const el = firstInputRef.current;
    if(el)
    {
      el.focus();
    }

  }, []);

  useEffect(() => {

    let isValid = true;
    if(Object.values(errors).length > 0)
    {
      isValid = false;
    }
    else   
    {
      for(let value of Object.values(values))
      {
          if(!value)
          {
            isValid = false;
            break;
          }
      }
    }

    setIsValid(isValid);

  }, [errors, values]);

  useEffect(() => {
      if(resetPassword.success) 
      {
          setValues(initialValues);
          setIsResetPasswordSuccess(true);
          dispatch({
              type: userActionTypes.RESET_PASSWORD_USER_INITIAL_STATE
          });
      }

  }, [resetPassword.success, initialValues]);


  const handleChange = e => {
    let {name, value} = e.target;

    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'email')
    {
        if(value && !regex.EMAIL_REGEX.test(value))
        {
          _errors.email = "Enter a valid email.";
        }
        else 
        {
          delete _errors.email;
        }
    }
  

    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    setErrors(_errors);

  }

  const handleSubmit =  e => {
    e.preventDefault();
    dispatch({
      type: userActionTypes.RESET_PASSWORD_USER_LOADING
    });
    dispatch({
      type: userActionTypes.RESET_PASSWORD_USER,
      payload: values
    });
  }

  return (
    <div className="reset-password">
      <h5 className='reset-password__heading'>Enter your registered email</h5>
      
      {isResetPasswordSuccess && <Success success="We have sent you a link via email. Click on the link to reset your password." />}

      <form onSubmit={handleSubmit} className="reset-password__form">
          <TextInput label="Email" name="email" ref={firstInputRef} value={values.email} onChange={handleChange} error={errors.email} placeholder="Enter your registered email" />
          <div className='reset-password__btn-container'>
            <button className='reset-password__btn' disabled={!isValid || resetPassword.loading}>Send</button>
          </div>
      </form>
     {resetPassword.loading && <Loading />}
     {resetPassword.error && <Error error={resetPassword.error} />}
      <div className='reset-password__bottom'>
        <NavLink to="/user/signin" className='reset-password__link'>Sign In</NavLink>|
        <NavLink to="/user/signup" className='reset-password__link'>Sign Up</NavLink>
      </div>
    </div>
  );
}

export default ResetPassword;