import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className="search-bar">
        <input type="text" className="search-bar__input" />
        <button className="search-bar__btn">
            <SearchIcon />
        </button>
    </div>
  );
}

export default SearchBar;