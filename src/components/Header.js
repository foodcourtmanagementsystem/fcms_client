import './Header.css';
import HamburgerMenu from './styled/HamburgerMenu';
import BrandName from './styled/BrandName';
import BrandLogo from './styled/BrandLogo';
import SearchBar from './styled/SearchBar';
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DropdownMenu from './styled/DropdownMenu';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as userActionTypes from '../actionTypes/user';

function Header() {
  const user = useSelector(state => state.user.data);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = e => {
    setShowDropdownMenu(prevShowDropdownMenu => !prevShowDropdownMenu);
  }

  const items = [
    {
      title: "Profile",
      onClick: () => {
          navigate("/user/profile");
          setShowDropdownMenu(false);
      }
    },
    {
      title: "Settings",
      onClick: () => {
        navigate("/user/settings");
        setShowDropdownMenu(false);
      }
    },
    {
      title: "Sign Out", 
      onClick: () => {
        dispatch({
          type: userActionTypes.SIGN_OUT_USER_LOADING
        });
        dispatch({
          type: userActionTypes.SIGN_OUT_USER
        });
        setShowDropdownMenu(false);
      }
    }
  ];

  return (
    <header className="header">
      <div className="header__left">
        <HamburgerMenu />
        <NavLink to={'/'}>
          <BrandLogo />
        </NavLink>
        <NavLink to={'/'}>
          <BrandName />
        </NavLink>
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
          <NavLink to="/cart">
            <ShoppingCartIcon className='icon' />
          </NavLink>
        {user.isAuthenticated ? 
          <div style={{
            position: 'relative',
          }}>
            <AccountCircleIcon className="icon" onClick={handleClick} />
            {showDropdownMenu && <DropdownMenu items={items} style={{
                top: 30,
                right: 20
            }} />}
          </div>
        : 
        <>        
          <NavLink to="/user/signin" className='header__right-btn header__right-btn--sign'>Sign In</NavLink>
          <NavLink to="/user/signup" className='header__right-btn header__right-btn--sign'>Sign Up</NavLink>
        </>
        
        }

      </div>
    </header>
  );
}

export default Header;