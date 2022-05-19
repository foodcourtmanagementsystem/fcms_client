import './FoodCategory.css';
import {useSelector, useDispatch} from 'react-redux';
import TextInput from '../../components/styled/TextInput';
import {useState, useRef, useEffect} from 'react';
import FileInput from '../../components/styled/FileInput';
import {v4 as uuidv4} from 'uuid';
import * as fileActionTypes from '../../actionTypes/file';
import Loading from '../../components/styled/Loading';
import Success from '../../components/styled/Success';
import Error from '../../components/styled/Error';
import * as foodCategoryActionTypes from '../../actionTypes/foodCategory';
import * as settings from '../../config/settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../../components/styled/Modal';
import * as foodItemActionTypes from '../../actionTypes/foodItem';

const FoodCategoryInput = ({isEditing}) => {

  const initialValues = {
      title: "",
      image: ""
  };

  const initialFileValues = {
    image: []
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [fileValues, setFileValues] = useState(initialFileValues);
  const [fileErrors, setFileErrors] = useState({});
  const firstInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const upload = useSelector(state => state.file.upload);
  const [isUploading, setIsUploading] = useState(false);
  const createFoodCategory = useSelector(state => state.foodCategory.create);
  const fileInputRef = useRef();
  const editFoodCategory = useSelector(state => state.foodCategory.edit);
  const deleteFoodCategory = useSelector(state => state.foodCategory.delete);


  useEffect(() => {
    const el = firstInputRef.current;
    if(el)
      el.focus();

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

  }, [values, errors]);


  useEffect(() => {
    if(isEditing && editFoodCategory.data)
    {
      setValues({
        title: editFoodCategory.data.title,
        image: editFoodCategory.data.image
      });
    }

  }, [isEditing, editFoodCategory.data]);

  useEffect(() => {
    if(deleteFoodCategory.success)
    {
      dispatch({
        type: foodItemActionTypes.LIST_FOOD_ITEM
      });
    }

  }, [deleteFoodCategory.success]);

  const handleChange = e => {
    if(createFoodCategory.success)
    {
      dispatch({
        type: foodCategoryActionTypes.CREATE_FOOD_CATEGORY_INITIAL_STATE
      });
    }

    const {name, value} = e.target;
    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'title') 
    {
      if(value.length > 200)
      {
        _errors.title = "Title length should be less than or equal to 200."
      }
      else 
      {
        delete _errors.title;
      }
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    setErrors(_errors);

  }

  useEffect(() => {
     if(fileValues.image[0] && (upload.success[fileValues.image[0].id] || upload.error[fileValues.image[0].id]))
     {
        setIsUploading(false);
     }

     if(upload.success[fileValues.image[0]?.id])
     {
       setValues(prevValues => ({
         ...prevValues,
         image: upload.success[fileValues.image[0].id]
       }));
     }

  }, [fileValues.image[0], upload.success, upload.error]);

  useEffect(() => {

    if(createFoodCategory.success)
    {
      setValues(initialValues);
      setFileValues(initialFileValues);
      const el = fileInputRef.current;
      if(el)
      {
        el.value = "";
      }
    }

  }, [createFoodCategory.success]);


  const handleFileChange = e => {
    if(createFoodCategory.success)
    {
      dispatch({
        type: foodCategoryActionTypes.CREATE_FOOD_CATEGORY_INITIAL_STATE
      });
    }

      const file = e.target.files[0];
      const {name} = e.target;

      if(file)
      {
        const _fileErrors = {...fileErrors};

        if(name === 'image')
        {
          if(!/image\/*/.test(file.type))
          {
            _fileErrors.image = "Upload image only."
          }
          else if(file.size > 5 * 1024 * 1024)
          {
            _fileErrors.image = "File size should be less than or equal to 5MB."
          }
          else 
          {
            delete _fileErrors.image;
          }
        }
  
        setFileValues(prevFileValues => ({
          ...prevFileValues,
          [name]: [
            {
              id: uuidv4(),
              file
            }
          ]
        }));
  
        setFileErrors(_fileErrors);
      }
  }

  const uploadFile = e => {
    e.preventDefault();
    setIsUploading(true);

    if(isEditing)
    {
      dispatch({
        type: fileActionTypes.DELETE_FILE,
        payload: {
          URL: "/api/FoodCategories/DeleteFile",
          id: editFoodCategory.data.id,
          path: editFoodCategory.data.image
        }
      });
    }

    dispatch({
      type: fileActionTypes.UPLOAD_FILE,
      payload: {
        ...fileValues.image[0], 
        name: 'image',
        URL: "/api/FoodCategories/UploadFile"
      }
    });
  }


  const handleSubmit =  e => { 
    e.preventDefault();

    if(!isEditing)
    {
      dispatch({
        type: foodCategoryActionTypes.CREATE_FOOD_CATEGORY_LOADING
      });
      const date = new Date();
      const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dispatch({
        type: foodCategoryActionTypes.CREATE_FOOD_CATEGORY,
        payload: {
          ...values,
          //createdAt
        }
      });
    }
    else 
    {
      dispatch({
        type: foodCategoryActionTypes.EDIT_FOOD_CATEGORY_LOADING
      });
      const date = new Date();
      const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dispatch({
        type: foodCategoryActionTypes.EDIT_FOOD_CATEGORY,
        payload: {
          id: editFoodCategory.data.id,
          ...values,
          //createdAt
        }
      });
    }

  }



  return (
    <form className="dashboard-food-category-input" onSubmit={handleSubmit}>
      <TextInput ref={firstInputRef} label="Title *" name="title" id="title" value={values.title} onChange={handleChange} error={errors.title} placeholder="Enter food category title" />   
      <div className="file-input-container">
        <label htmlFor={isEditing ? "editingImage" : "image"} className="file-input__label">Add Image *</label>
        <FileInput style={{
          display: 'none'
        }}  ref={fileInputRef} accept="image/*" onChange={handleFileChange}  name="image" id={isEditing ? "editingImage" : "image"} disabled={upload.progress[fileValues.image[0]?.id] && !upload.success[fileValues.image[0]?.id] && !upload.error[fileValues.image[0]?.id]} />
        {fileValues.image[0] && <div className="file-description">{fileValues.image[0].file.name}</div>}
        {isUploading && <Loading />}
        {fileValues.image[0] && upload.success[fileValues.image[0].id] && !upload.error[fileValues.image[0].id] && <Success success="Image is uploaded successfully." />}
        {fileValues.image[0] && upload.error[fileValues.image[0].id] && !upload.success[fileValues.image[0].id] && <Error error={upload.error[fileValues.image[0].id]} />}
        {fileValues.image[0] && !fileErrors.image && !isUploading && !upload.success[fileValues.image[0].id] && <button className="file-input__upload-btn" onClick={uploadFile}>Upload</button>}
      </div>
      {fileErrors.image && <div className="file-input-error">{fileErrors.image}</div>}
      <div className="dashboard-food-category-input__submit-container">
         <input type="submit" value={!isEditing ? "Add+" : "Edit"}  disabled={!isValid || createFoodCategory.loading} className="dashboard-food-category-input__submit" />
      </div>
      {createFoodCategory.loading && <Loading />}
      {createFoodCategory.error && <Error error={createFoodCategory.error} />}
      {createFoodCategory.success && <Success success="Food category is created successfully." />}
      {isEditing && editFoodCategory.loading && <Loading />}
      {isEditing && editFoodCategory.error && <Error error={editFoodCategory.error} />}
      {isEditing && editFoodCategory.success && <Success success="Food category is edited successfully." />}
    </form>
  );
}

const FoodCategoryItem = ({foodCategory}) => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const deleteFoodCategory = useSelector(state => state.foodCategory.delete);

  return (
    <div className="dashboard-food-category-item">
      {showModal && <Modal closeModal={() => { 
        setShowModal(false);
      }}>
                        <FoodCategoryInput isEditing />
                    </Modal>}
      <div className="dashboard-food-category-item__left">
        <img className="dashboard-food-category-item__image" src={`${settings.BASE_URL}/${foodCategory.image}`} title={foodCategory.title} alt={foodCategory.title} />
      </div>
      <div className="dashboard-food-category-item__center">
        <div className="dashboard-food-category-item__title">
          {foodCategory.title}
        </div>
        {deleteFoodCategory.data?.id === foodCategory.id && deleteFoodCategory.loading && <Loading />}
        {deleteFoodCategory.data?.id === foodCategory.id && deleteFoodCategory.error && <Error error={deleteFoodCategory.error} />}
      </div>
      <div className="dashboard-food-category-item__right">
        <button onClick={() => {
          dispatch({
            type: foodCategoryActionTypes.CREATE_FOOD_CATEGORY_INITIAL_STATE
          });
          dispatch({
            type: foodCategoryActionTypes.EDIT_FOOD_CATEGORY_DATA,
            payload: foodCategory
          });
          setShowModal(true);
        }} className="dashboard-food-category-item__action dashboard-food-category-item__action--edit">
          <EditIcon className="icon" />
          Edit          
        </button>
        <button onClick={() => {
          dispatch({
                type: foodCategoryActionTypes.DELETE_FOOD_CATEGORY_DATA,
                payload: {
                   id: foodCategory.id
                }
              });
          dispatch({
            type: foodCategoryActionTypes.DELETE_FOOD_CATEGORY_LOADING
          });
          dispatch({
            type: foodCategoryActionTypes.DELETE_FOOD_CATEGORY,
            payload: {
              id: foodCategory.id
            }
          });
        }} className="dashboard-food-category-item__action dashboard-food-category-item__action--delete">
          <DeleteForeverIcon className="icon" />
           Delete 
        </button>
      </div>
    </div>
  );
}

const FoodCategoryList = props => {
  const foodCategories = useSelector(state => state.foodCategory.data);
  const listFoodCategory = useSelector(state => state.foodCategory.list); 
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listFoodCategory.success)
    {
      dispatch({
        type: foodCategoryActionTypes.LIST_FOOD_CATEGORY_LOADING
      });
      dispatch({
        type: foodCategoryActionTypes.LIST_FOOD_CATEGORY
      });
    }

  }, [listFoodCategory.success]);

  return (
    <div className="dashboard-food-category-list">
      {listFoodCategory.loading && <Loading />}
      {listFoodCategory.error && <Error error={listFoodCategory.error} />}
      {foodCategories.map((foodCategory, index) => (<FoodCategoryItem key={index} foodCategory={foodCategory} />))}
    </div>
  );
}

function FoodCategory() {

  return (
    <div className="dashboard-food-category">
      <h5 className="dashboard-food-category__heading">Food Category</h5>
      <FoodCategoryInput />
      <FoodCategoryList />
    </div>
  );
}

export default FoodCategory;