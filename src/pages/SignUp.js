import {useState, useRef, useEffect} from 'react';
import './SignUp.css';
import TextInput from '../components/styled/TextInput';
import {NavLink} from 'react-router-dom';
import * as regex from '../utils/regex';


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
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessages, setServerMessages] = useState({});

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
        if(value && value.length < 8 )
        {
          _errors.password = "The password length should be 8 or more than 8.";
        }
        else 
        {
          delete _errors.password;
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


  const handleSubmit =  e => {
    e.preventDefault();

  }

  return (
    <div className="sign-up">

      <h4 className='sign-up__heading'>Sign Up</h4>

      <form onSubmit={handleSubmit} className="sign-up__form">
          <TextInput label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} ref={firstInputRef} placeholder="Enter your name" />
          <TextInput label="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} placeholder="Enter your email" />
          <TextInput label="Password" type="password" name="password" value={values.password} onChange={handleChange} error={errors.password} placeholder="Enter your password" />
          <TextInput label="Confirm Password" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Enter your password again" />
          <div className='sign-up__btn-container'>
            <button className='sign-up__btn' disabled={!isValid}>Register</button>
          </div>
      </form>
     
      <div className='sign-up__bottom'>
        Already have an account? <NavLink to="/user/signin" className='sign-up__sign-in-link'>Sign In</NavLink>
      </div>
    </div>
  );
}

export default SignUp;