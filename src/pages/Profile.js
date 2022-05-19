import './Profile.css';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import TextInput from '../components/styled/TextInput';
import PersonIcon from '@mui/icons-material/Person';
import NumberInput from '../components/styled/NumberInput';
import * as regex from '../utils/regex';
import * as userAddressActionTypes from '../actionTypes/userAddress';
import {useLocation, useNavigate} from 'react-router-dom';
import * as userActionTypes from '../actionTypes/user';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import Success from '../components/styled/Success';


function Profile() {

  const user = useSelector(state => state.user.data);
  const createUserAddress = useSelector(state => state.userAddress.create);
  const editUserAddress = useSelector(state => state.userAddress.edit);


  const initialValues = {
     name: user.name,
     phoneNumber: "",
     address1: "",
     address2: "",
     pinCode: "",
     city: "", 
     state: "", 
     country: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if(!user.isAuthenticated)
    {
       navigate(`/user/signin?returnUrl=${location.pathname}`); 
    }

  }, [user.isAuthenticated, location.pathname]);

  useEffect(() => {

    if(createUserAddress.success || editUserAddress.success)
    {
      if(searchParams.has('returnUrl'))
      {
        navigate(searchParams.get('returnUrl'));
      }
    }

  }, [createUserAddress.success, editUserAddress.success, searchParams]);

  console.log(createUserAddress, editUserAddress);

  useEffect(() => {
    if(user.name)
    {
      setValues(prevValues => ({
        ...prevValues,
        name: user.name,
      }));
    }

    if(user.address)
    {
      setValues(prevValues => ({
        ...prevValues,
        phoneNumber: user.address.phoneNumber,
        address1: user.address.address1,
        address2: user.address.address2, 
        pinCode: user.address.pinCode,
        city: user.address.city,
        state: user.address.state,
        country: user.address.country
      }));
    }

  }, [user.name, user.address]);

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
        if(key !== 'address2')
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

  }, [values, errors]);

  const handleChange = e => {
    let {name, value} = e.target;
    if(value === ' ') return;

    const _errors = {...errors};

    if(name === 'name')
    {
      if(!regex.NAME_REGEX.test(value))
      {
         _errors.name = "Enter a valid name.";
      }
      else
      {
        delete _errors.name;
      }
    }
    else if(name === 'phoneNumber')
    {
      if(value.toString().length !== 10)
      {
        _errors.phoneNumber = "Enter a valid phone number.";
      }
      else
      {
        delete _errors.phoneNumber;
      }
    }
    else if(name === 'pinCode')
    {
      if(value.toString().length !== 6)
      {
        _errors.pinCode = "Enter a valid pin code.";
      }
      else
      {
        delete _errors.pinCode;
      }
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    setErrors(_errors);

  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch({
      type: userActionTypes.UPDATE_USER_FULL_NAME_LOADING
    });
    dispatch({
      type: userActionTypes.UPDATE_USER_FULL_NAME,
      payload: {
        name: values.name
      }
    });

    const payload =  {
      phoneNumber: values.phoneNumber,
      address1: values.address1,
      address2: values.address2,
      pinCode: values.pinCode,
      city: values.city,
      state: values.state,
      country: values.country
    };

    if(!user.address)
    {
      dispatch({
        type: userAddressActionTypes.CREATE_USER_ADDRESS_LOADING
      });
      dispatch({
        type: userAddressActionTypes.CREATE_USER_ADDRESS,
        payload
      });
    }
    else
    {
      dispatch({
        type: userAddressActionTypes.EDIT_USER_ADDRESS_LOADING
      });
      dispatch({
        type: userAddressActionTypes.EDIT_USER_ADDRESS,
        payload: {
          id: user.address.id,
          ...payload
        }
      });
    }

  
  }

  return (
    <div className="profile">
      <div className="profile__heading">
        <h5>Profile</h5>
        <PersonIcon className="profile__heading-icon" />
      </div>
      <div className="profile__input">
        <form className="profile__input-form" onSubmit={handleSubmit}>
          <TextInput label="Name *" name="name" id="name" value={values.name} onChange={handleChange} placeholder="Enter your name" error={errors.name} />
          <NumberInput label="Phone Number *" name="phoneNumber" id="phoneNumber" value={values.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" error={errors.phoneNumber} />
          <TextInput label="Address1 *" name="address1" id="address1" value={values.address1} onChange={handleChange} placeholder="Enter your address1" error={errors.address1} />
          <TextInput label="Address2" name="address2" id="address2" value={values.address2} onChange={handleChange} placeholder="Enter your address2" error={errors.address2} />
          <div className="profile__input-group">
            <NumberInput label="Pin Code *" name="pinCode" id="pinCode" value={values.pinCode} onChange={handleChange} placeholder="Enter your pin code" error={errors.pinCode} />
            <TextInput label="City *" name="city" id="city" value={values.city} onChange={handleChange} placeholder="Enter your city"error={errors.city} />
          </div>
          <div className="profile__input-group">
            <TextInput label="State *" name="state" id="state" value={values.state} onChange={handleChange} placeholder="Enter your state" error={errors.state} />
            <TextInput label="Country *" name="country" id="country" value={values.country} onChange={handleChange} placeholder="Enter your country" error={errors.country} />
          </div>
          <div className="profile__input-submit-btn-container"> 
            <input type="submit" value="Save" disabled={!isValid} className="profile__input-submit-btn" />
          </div>
        </form>
        {createUserAddress.loading && <Loading />}
        {createUserAddress.error && <Error error={createUserAddress.error} />}
        {createUserAddress.success && <Success success={"Profile is saved successfully."} />}

        {editUserAddress.loading && <Loading />}
        {editUserAddress.error && <Error error={editUserAddress.error} />}
        {editUserAddress.success && <Success success={"Profile is saved successfully."} />}
      </div>
    </div>
  );
}

export default Profile;