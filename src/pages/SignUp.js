import {useState, useRef, useEffect} from 'react';
import './SignUp.css';
import TextInput from '../components/styled/TextInput';
import {NavLink} from 'react-router-dom';
import * as regex from '../utils/regex';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector, useDispatch} from 'react-redux';
import * as userActionTypes from '../actionTypes/user';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import {useNavigate} from 'react-router-dom';

function SignUp() {

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const signUp = useSelector(state => state.user.signUp);
  const navigate = useNavigate();

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
    if(signUp.success)
    {
      navigate("/user/signin");
    }

  }, [signUp.success]);


  const handleChange = e => {
    let {name, value} = e.target;

    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'name')
    {
        if(value && !regex.NAME_REGEX.test(value))
        {
          _errors.name = "Enter a valid name.";
        }
        else 
        {
          delete _errors.name;
        }
      
    }
    else if(name === 'email')
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
      type: userActionTypes.SIGN_UP_USER_LOADING
    });
    dispatch({
      type: userActionTypes.SIGN_UP_USER,
      payload: {
        name: values.name, 
        email: values.email,
        password: values.password
      }
    });
  }

  return (
    <div className="sign-up">

      <h5 className='sign-up__heading'>Sign Up</h5>

      <form onSubmit={handleSubmit} className="sign-up__form">
          <TextInput label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} ref={firstInputRef} placeholder="Enter your name" />
          <TextInput label="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} placeholder="Enter your email" />
          <div className="sign-up__password-container">
            <TextInput label="Password" type={isVisible ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Enter your password" />
            {isVisible ? <VisibilityIcon className="icon" onClick={changeVisibility} /> : <VisibilityOffIcon className="icon" onClick={changeVisibility} /> }
          </div>
          <TextInput label="Confirm Password" type={isVisible ? 'text' : 'password'} name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Enter your password again" />
          <div className='sign-up__btn-container'>
            <button className='sign-up__btn' disabled={!isValid || signUp.loading}>Register</button>
          </div>
      </form>
     {signUp.loading && <Loading />}
     {signUp.error && <Error error={signUp.error} />}
      <div className='sign-up__bottom'>
        Already have an account? <NavLink to="/user/signin" className='sign-up__sign-in-link'>Sign In</NavLink>
      </div>
    </div>
  );
}

export default SignUp;