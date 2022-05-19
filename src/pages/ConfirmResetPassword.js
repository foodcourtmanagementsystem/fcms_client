import {useState, useRef, useEffect} from 'react';
import './ConfirmResetPassword.css';
import TextInput from '../components/styled/TextInput';
import {NavLink} from 'react-router-dom';
import * as regex from '../utils/regex';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector, useDispatch} from 'react-redux';
import * as userActionTypes from '../actionTypes/user';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import {useNavigate, useParams, useLocation} from 'react-router-dom';

function ConfirmResetPassword() {

  const initialValues = {
    password: "",
    confirmPassword: ""
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const confirmResetPassword = useSelector(state => state.user.confirmResetPassword);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const validator = searchParams.get("validator");

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
    if(confirmResetPassword.success)
    {
      navigate("/user/signin");
    }

  }, [confirmResetPassword.success]);


  const handleChange = e => {
    let {name, value} = e.target;

    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'password')
    {
        if(value && !regex.PASSWORD_REGEX.test(value))
        {
          _errors.password = "The password length should be 8 or more than 8 with at least one uppercase letter, one lower case letter, one digit and one special character.";
        }
        else 
        {
          delete _errors.password;
        }

        if(values.confirmPassword && value !== values.confirmPassword)
        {
            _errors.confirmPassword = "Password and Confirm Password should be same.";
        }
        else 
        {
            delete _errors.confirmPassword;
        }
    }
    else if(name === 'confirmPassword')
    {
        if(values.password !== value)
        {
          _errors.confirmPassword = "Password and Confirm Password should be same.";
        }
        else 
        {
          delete _errors.confirmPassword;
        }
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
      type: userActionTypes.CONFIRM_RESET_PASSWORD_USER_LOADING
    });
    dispatch({
      type: userActionTypes.CONFIRM_RESET_PASSWORD_USER,
      payload: {
        userId: params.userId,
        validator,
        newPassword: values.password
      }
    });
  }

  return (
    <div className="confirm-reset-password">

      <h5 className='confirm-reset-password__heading'>Reset your password</h5>

      <form onSubmit={handleSubmit} className="confirm-reset-password__form">
          <div className="confirm-reset-password__password-container">
            <TextInput label="New Password" ref={firstInputRef} type={isVisible ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Enter your new password" />
            {isVisible ? <VisibilityIcon className="icon" onClick={changeVisibility} /> : <VisibilityOffIcon className="icon" onClick={changeVisibility} /> }
          </div>
          <TextInput label="Confirm New Password" type={isVisible ? 'text' : 'password'} name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Enter your new password again" />
          <div className='confirm-reset-password__btn-container'>
            <button className='confirm-reset-password__btn' disabled={!isValid || confirmResetPassword.loading}>Reset</button>
          </div>
      </form>
     {confirmResetPassword.loading && <Loading />}
     {confirmResetPassword.error && <Error error={confirmResetPassword.error} />}
      <div className='confirm-reset-password__bottom'>
          <NavLink to="/user/signin" className='confirm-reset-password__link'>Sign In</NavLink>|
          <NavLink to="/user/signup" className='confirm-reset-password__link'>Sign Up</NavLink>
      </div>
    </div>
  );
}

export default ConfirmResetPassword;