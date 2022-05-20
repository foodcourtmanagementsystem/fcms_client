import {useState, useRef, useEffect} from 'react';
import './ChangePassword.css';
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
import Success from '../components/styled/Success';


function ChangePassword() {

  const initialValues = {
      oldPassword: '',
      password: "",
      confirmPassword: ""
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const changePassword = useSelector(state => state.user.changePassword);


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
    return () => {
        dispatch({
            type: userActionTypes.CHANGE_PASSWORD_USER_INITIAL_STATE
        });
    }

  }, []);


  const handleChange = e => {
    let {name, value} = e.target;

    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'oldPassword')
    {
        if(value && !regex.PASSWORD_REGEX.test(value))
        {
          _errors.oldPassword = "The old password length should be 8 or more than 8 with at least one uppercase letter, one lower case letter, one digit and one special character.";
        }
        else 
        {
          delete _errors.oldPassword;
        }

    }
    else if(name === 'password')
    {
        if(value && !regex.PASSWORD_REGEX.test(value))
        {
          _errors.password = "The new password length should be 8 or more than 8 with at least one uppercase letter, one lower case letter, one digit and one special character.";
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
      type: userActionTypes.CHANGE_PASSWORD_USER_LOADING
    });
    dispatch({
      type: userActionTypes.CHANGE_PASSWORD_USER,
      payload: {
        oldPassword: values.oldPassword,
        newPassword: values.password
      }
    });
  }



  return (
    <div className="change-password">

      <h5 className='change-password__heading'>Change your password</h5>

      <form onSubmit={handleSubmit} className="change-password__form">
           <div className="change-password__password-container">
            <TextInput label="Old Password *" ref={firstInputRef} type={isVisible ? 'text' : 'password'} name="oldPassword" value={values.oldPassword} onChange={handleChange} error={errors.oldPassword} placeholder="Enter your old password" />
            {isVisible ? <VisibilityIcon className="icon" onClick={changeVisibility} /> : <VisibilityOffIcon className="icon" onClick={changeVisibility} /> }
          </div>
        
          <TextInput label="New Password *" type={isVisible ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Enter your new password" />
          <TextInput label="Confirm New Password" type={isVisible ? 'text' : 'password'} name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Enter your new password again" />
          <div className='change-password__btn-container'>
            <button className='change-password__btn' disabled={!isValid || changePassword.loading}>Change</button>
          </div>
      </form>
     {changePassword.loading && <Loading />}
     {changePassword.error && <Error error={changePassword.error} />}
     {changePassword.success && <Success success={"Your password has been changed successfully!"} />}
    </div>
  );
}

export default ChangePassword;