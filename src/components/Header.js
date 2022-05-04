import './Header.css';
import HamburgerMenu from './styled/HamburgerMenu';
import BrandName from './styled/BrandName';
import BrandLogo from './styled/BrandLogo';
import SearchBar from './styled/SearchBar';
import {NavLink} from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <HamburgerMenu />
        <BrandLogo />
        <BrandName />
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
        <NavLink to="/user/signin" className='header__right-btn'>Sign In</NavLink>
        <NavLink to="/user/signup" className='header__right-btn'>Sign Up</NavLink>
      </div>
    </header>
  );
}

export default Header;