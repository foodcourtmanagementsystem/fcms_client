import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as searchActionTypes from '../../actionTypes/search';
import {useNavigate} from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    let {value} = e.target;

    if(value === ' ') return;
    setQuery(value);
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    if(query)
    {
      dispatch({
        type: searchActionTypes.SEARCH_RESULT_INITIAL_STATE
      });
      navigate(`/search?query=${query}`);
    }

  }

  return (
    <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <input type="text" className="search-bar__input" name="query" id="query" onChange={handleChange} placeholder="Search food items" />
          <button className="search-bar__btn" disabled={!query}>
            <SearchIcon />
          </button>
        </form>
    </div>
  );
}

export default SearchBar;