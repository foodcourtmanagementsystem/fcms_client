import {useState, useRef, useEffect} from 'react';
import './SignIn.css';
import TextInput from '../components/styled/TextInput';
import {NavLink} from 'react-router-dom';
import * as regex from '../utils/regex';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector, useDispatch} from 'react-redux';
import * as userActionTypes from '../actionTypes/user';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import Success from '../components/styled/Success';
import {useNavigate, useLocation} from 'react-router-dom';


function SignIn() {

  const initialValues = {
    email: "",
    password: "",
    rememberMe: true
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSelector(state => state.user.signIn);
  const signUp = useSelector(state => state.user.signUp);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.data);
  const confirmResetPassword = useSelector(state => state.user.confirmResetPassword);
  const [isConfirmResetPasswordSuccess, setIsConfirmResetPasswordSuccess] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const el = firstInputRef.current;
    if(el)
    {
      el.focus();
    }

    return () => {
      dispatch({
        type: userActionTypes.SIGN_IN_USER_INITIAL_STATE
      });
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
      for(let [key, value] of Object.entries(values))
      {
        if(key !== 'rememberMe')
        {
          if(!value)
          {
            isValid = false;
            break;
          }
        }
      }
    }

    setIsValid(isValid);

  }, [errors, values]);


  useEffect(() => {
    if(signUp.success)
    {
      dispatch({
        type: userActionTypes.SIGN_UP_USER_INITIAL_STATE
      });
      setIsSignUpSuccess(true);    
    }

  }, [signUp.success]);

  useEffect(() => {
    if(confirmResetPassword.success)
    {
      dispatch({
        type: userActionTypes.CONFIRM_RESET_PASSWORD_USER_INITIAL_STATE
      });
      setIsConfirmResetPasswordSuccess(true);
    }

  }, [confirmResetPassword.success]);


  useEffect(() => {
    if(user.isAuthenticated)
    {
       if(searchParams.has('returnUrl'))
       {
          navigate(searchParams.get('returnUrl'));
       }
       else if(user.roles.includes("Admin"))
       {
          navigate(`/user/${user.id}/dashboard`);
       }
       else 
       {
          navigate('/');
       }
    }

  }, [user.isAuthenticated, searchParams]);



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
    else if(name === 'password')
    {
        if(value && !regex.PASSWORD_REGEX.test(value))
        {
          _errors.password = "The password length should be 8 or more than 8 with at least one uppercase letter, one lower case letter, one digit and one special character.";
        }
        else 
        {
          delete _errors.password;
        }
    }
    else if(name === 'rememberMe')
    {
        value = e.target.checked;
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    setErrors(_errors);

  }


  const changeVisibility = e => {
    setIsVisible(prevIsVisible => !prevIsVisible);
  }

  const handleSubmit =  e => {
    e.preventDefault();
    dispatch({
      type: userActionTypes.SIGN_IN_USER_LOADING
    });
    dispatch({
      type: userActionTypes.SIGN_IN_USER,
      payload: values
    });
  }

  return (
    <div className="sign-in">
      <h5 className='sign-in__heading'>Sign In</h5>
      
      {isSignUpSuccess && <Success success="Your registration is successful! We have sent you a link via email. Click on the link to verify your email." />}
      {isConfirmResetPasswordSuccess && <Success success="Your password is successfully reset! Login to continue." />}

      <form onSubmit={handleSubmit} className="sign-in__form">
          <TextInput label="Email" name="email" ref={firstInputRef} value={values.email} onChange={handleChange} error={errors.email} placeholder="Enter your email" />
          <div className="sign-in__password-container">
            <TextInput label="Password" type={isVisible ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Enter your password" />
            {isVisible ? <VisibilityIcon className="icon" onClick={changeVisibility} /> : <VisibilityOffIcon className="icon" onClick={changeVisibility} /> }
          </div>
          <div className="forgot-password-container"> 
            <NavLink to="/user/resetpassword" className="forgot-password">Forgot password</NavLink>
          </div>
          <div className="checkbox-input-group">
            <input type="checkbox" className="checkbox-input" id="rememberMe" name="rememberMe" onChange={handleChange} value={values.rememberMe} checked={values.rememberMe} />
            <label htmlFor="rememberMe" className="checkbox-input-label">Remember me</label>
          </div>
          <div className='sign-in__btn-container'>
            <button className='sign-in__btn' disabled={!isValid || signIn.loading}>Login</button>
          </div>
      </form>
     {signIn.loading && <Loading />}
     {signIn.error && <Error error={signIn.error} />}
      <div className='sign-in__bottom'>
        Don't have an account? <NavLink to="/user/signup" className='sign-in__sign-up-link'>Sign Up</NavLink>
      </div>
    </div>
  );
}

export default SignIn;