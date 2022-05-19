import './FoodItem.css';
import {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TextInput from '../../components/styled/TextInput';
import FileInput from '../../components/styled/FileInput';
import {v4 as uuidv4} from 'uuid';
import * as fileActionTypes from '../../actionTypes/file';
import Loading from '../../components/styled/Loading';
import Success from '../../components/styled/Success';
import Error from '../../components/styled/Error';
import * as foodItemActionTypes from '../../actionTypes/foodItem';
import * as settings from '../../config/settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../../components/styled/Modal';
import TextArea from '../../components/styled/TextArea';
import NumberInput from '../../components/styled/NumberInput';
import SelectInput from '../../components/styled/SelectInput';
import * as foodCategoryActionTypes from '../../actionTypes/foodCategory';

const FoodItemInput = ({isEditing}) => {

  const initialValues = {
      title: "",
      description: "",
      price: 0,
      image: "",
      stock: 1,
      foodCategoryId: -1
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
  const createFoodItem = useSelector(state => state.foodItem.create);
  const fileInputRef = useRef();
  const editFoodItem = useSelector(state => state.foodItem.edit);
  const foodCategories = useSelector(state => state.foodCategory.data);
  const listFoodCategory = useSelector(state => state.foodCategory.list);

  useEffect(() => {
    const el = firstInputRef.current;
    if(el)
      el.focus();

  }, []);

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
        if(key === 'foodCategoryId')
        {
          if(value < 0)
          {
            isValid = false;
            break;
          }
        }
        else if(key === 'price')
        {
          if(value < 0)
          {
            isValid = false;
            break;
          }
        }
        else if(key === 'stock')
        {
          if(value < 1)
          {
            isValid = false;
            break;
          }
        }
        else if(!value)
        {
          isValid = false;
          break;
        }
        
      }
    }
    
   setIsValid(isValid);

  }, [values, errors]);


  useEffect(() => {
    if(isEditing && editFoodItem.data)
    {
      setValues({
        title: editFoodItem.data.title,
        description: editFoodItem.data.description,
        price: editFoodItem.data.price,
        image: editFoodItem.data.image,
        stock: editFoodItem.data.stock,
        foodCategoryId: editFoodItem.data.foodCategoryId
      });
    }

  }, [isEditing, editFoodItem.data]);

  const handleChange = e => {
    if(createFoodItem.success)
    {
      dispatch({
        type: foodItemActionTypes.CREATE_FOOD_ITEM_INITIAL_STATE
      });
    }

    const {name, value} = e.target;
    const _errors = {...errors};

    if(value === ' ') return;

    if(name === 'title') 
    {
      if(value.length > 500)
      {
        _errors.title = "Title length should be less than or equal to 500."
      }
      else 
      {
        delete _errors.title;
      }
    }
    else if(name === 'price')
    {
      if(value < 0)
      {
        _errors.price = "Price must be greater than or equal to 0.";
      }
      else
      {
        delete _errors.price;
      }
    }
    else if(name === 'stock') 
    {
      if(value < 1)
      {
        _errors.stock = "Stock value must be greater than or equal to 1.";
      }
      else
      {
        delete _errors.stock;
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

    if(createFoodItem.success)
    {
      setValues(initialValues);
      setFileValues(initialFileValues);
      const el = fileInputRef.current;
      if(el)
      {
        el.value = "";
      }
    }

  }, [createFoodItem.success]);


  const handleFileChange = e => {
    if(createFoodItem.success)
    {
      dispatch({
        type: foodItemActionTypes.CREATE_FOOD_ITEM_INITIAL_STATE
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
          URL: "/api/FoodItems/DeleteFile",
          id: editFoodItem.data.id,
          path: editFoodItem.data.image
        }
      });
    }

    dispatch({
      type: fileActionTypes.UPLOAD_FILE,
      payload: {
        ...fileValues.image[0], 
        name: 'image',
        URL: "/api/FoodItems/UploadFile"
      }
    });
  }


  const handleSubmit =  e => { 
    e.preventDefault();

    if(!isEditing)
    {
      dispatch({
        type: foodItemActionTypes.CREATE_FOOD_ITEM_LOADING
      });
      const date = new Date();
      const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dispatch({
        type: foodItemActionTypes.CREATE_FOOD_ITEM,
        payload: {
          ...values,
          //createdAt
        }
      });
    }
    else 
    {
      dispatch({
        type: foodItemActionTypes.EDIT_FOOD_ITEM_LOADING
      });
      const date = new Date();
      const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dispatch({
        type: foodItemActionTypes.EDIT_FOOD_ITEM,
        payload: {
          id: editFoodItem.data.id,
          ...values,
          //createdAt
        }
      });
    }

  }

  const selectItems = [
    {
      title: "Please select a food category.",
      value: -1
    },
    ...foodCategories.map(foodCategory => ({
      title: foodCategory.title.length < 50 ? foodCategory.title : foodCategory.title.substring(0, 50)+"...",
      value: foodCategory.id
    }))
  ];


  return (
    <form className="dashboard-food-item-input" onSubmit={handleSubmit}>
      <TextInput ref={firstInputRef} label="Title *" name="title" id="title" value={values.title} onChange={handleChange} error={errors.title} placeholder="Enter food item title" />   
      <TextArea  label="Description *" name="description" id="description" value={values.description} onChange={handleChange} error={errors.description} placeholder="Enter food item description" />
      <NumberInput label="Price in Rs. *" name="price" id="price" min={0} value={values.price} onChange={handleChange} error={errors.price} placeholder="Enter food item price" />      
      <SelectInput label="Food Category *" name="foodCategoryId" id="foodCategoryId" value={values.foodCategoryId} onChange={handleChange} error={errors.foodCategoryId} items={selectItems}  />
      <NumberInput label="Stock *" name="stock" id="stock" min={1} value={values.stock} onChange={handleChange} error={errors.stock} placeholder="Enter food item stock" />   
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
      <div className="dashboard-food-item-input__submit-container">
         <input type="submit" value={!isEditing ? "Add+" : "Edit"} disabled={!isValid || createFoodItem.loading} className="dashboard-food-item-input__submit" />
      </div>
      {createFoodItem.loading && <Loading />}
      {createFoodItem.error && <Error error={createFoodItem.error} />}
      {createFoodItem.success && <Success success="Food item is created successfully." />}
      {isEditing && editFoodItem.loading && <Loading />}
      {isEditing && editFoodItem.error && <Error error={editFoodItem.error} />}
      {isEditing && editFoodItem.success && <Success success="Food item is edited successfully." />}
    </form>
  );
}

const FoodItemItem = ({foodItem}) => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const deleteFoodItem = useSelector(state => state.foodItem.delete);
  const foodCategories = useSelector(state => state.foodCategory.data);

  return (
    <div className="dashboard-food-item-item">
      {showModal && <Modal closeModal={() => { 
        setShowModal(false);
      }}>
                        <FoodItemInput isEditing />
                    </Modal>}
      <div className="dashboard-food-item-item__left">
        <img className="dashboard-food-item-item__image" src={`${settings.BASE_URL}/${foodItem.image}`} title={foodItem.title} alt={foodItem.title} />
      </div>
      <div className="dashboard-food-item-item__center">
        <div className="dashboard-food-item-item__title">
          Title : {foodItem.title}
        </div>
        <div className="dashboard-food-item-item__description">
          Description : {foodItem.description}
        </div>
        <div className="dashboard-food-item-item__food-category">
          Food Category : {foodCategories.filter(foodCategory => foodCategory.id === foodItem.foodCategoryId)[0]?.title}
        </div>
        <div className="dashboard-food-item-item__food-price">
          Price : Rs. {foodItem.price}
        </div>
        <div className="dashboard-food-item-item__stock">
          Stock : {foodItem.stock}
        </div>
        {deleteFoodItem.data?.id === foodItem.id && deleteFoodItem.loading && <Loading />}
        {deleteFoodItem.data?.id === foodItem.id && deleteFoodItem.error && <Error error={deleteFoodItem.error} />}
      </div>
      <div className="dashboard-food-item-item__right">
        <button onClick={() => {
          dispatch({
            type: foodItemActionTypes.CREATE_FOOD_ITEM_INITIAL_STATE
          });
          dispatch({
            type: foodItemActionTypes.EDIT_FOOD_ITEM_DATA,
            payload: foodItem
          });
          setShowModal(true);
        }} className="dashboard-food-item-item__action dashboard-food-item-item__action--edit">
          <EditIcon className="icon" />
          Edit          
        </button>
        <button onClick={() => {
          dispatch({
                type: foodItemActionTypes.DELETE_FOOD_ITEM_DATA,
                payload: {
                   id: foodItem.id
                }
              });
          dispatch({
            type: foodItemActionTypes.DELETE_FOOD_ITEM_LOADING
          });
          dispatch({
            type: foodItemActionTypes.DELETE_FOOD_ITEM,
            payload: {
              id: foodItem.id
            }
          });
        }} className="dashboard-food-item-item__action dashboard-food-item-item__action--delete">
          <DeleteForeverIcon className="icon" />
           Delete 
        </button>
      </div>
    </div>
  );
}

const FoodItemList = props => {
  const foodItems = useSelector(state => state.foodItem.data);
  const listFoodItem = useSelector(state => state.foodItem.list); 
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listFoodItem.success)
    {
      dispatch({
        type: foodItemActionTypes.LIST_FOOD_ITEM_LOADING
      });
      dispatch({
        type: foodItemActionTypes.LIST_FOOD_ITEM
      });
    }

  }, [listFoodItem.success]);

  return (
    <div className="dashboard-food-item-list">
      {listFoodItem.loading && <Loading />}
      {listFoodItem.error && <Error error={listFoodItem.error} />}
      {foodItems.map((foodItem, index) => (<FoodItemItem key={index} foodItem={foodItem} />))}
    </div>
  );
}

function FoodItem() {
  return (
    <div className="dashboard-food-item">
      <h5 className="dashboard-food-item__heading">Food Item</h5>
      <FoodItemInput />
      <FoodItemList />
    </div>
  );
}

export default FoodItem;