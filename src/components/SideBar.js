import './SideBar.css';
import {NavLink} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {useSelector} from 'react-redux';


const SideBarItem = ({item}) => {

  const {to, Icon, title} = item;

  return (
    <NavLink to={to} className={navItem => navItem.isActive ? 'side-bar-item active' : 'side-bar-item'}>
      {Icon && <Icon className='side-bar-item__icon' />}
      <div className='side-bar-item__title'>{title}</div>
    </NavLink>
  );

}

function SideBar() {

  const user = useSelector(state => state.user.data);

  const navItems = [];
  if(user.isAuthenticated && user.roles.includes('Admin'))
  {
    navItems.push({
      to: `/user/${user.id}/dashboard`,
      title: "Dashboard",
      Icon: DashboardIcon
    });
  }

  navItems.push(
    {
      to: "/",
      title: "Home",
      Icon: HomeIcon
    },
    {
      to: "/cart",
      title: "Cart",
      Icon: ShoppingCartIcon
    });

  if(user.isAuthenticated)
  {
    navItems.push( {
      to: "/payment",
      title: "Payment",
      Icon: PaymentIcon
    },
    {
      to: "/orderandhistory",
      title: "Order & History",
      Icon: HistoryIcon
    },
    {
       to: "/user/profile",
       title: "Profile",
       Icon: AccountCircleIcon
    },
    {
      to: "/user/settings",
      title: "Settings",
      Icon: SettingsIcon
    });
  }

  if(!user.isAuthenticated)
  {
    navItems.push({
      to: "/user/signin",
      title: "Sign In",
      Icon: LoginIcon
    }, 
    {
      to: "/user/signup",
      title: "Sign Up",
      Icon: PersonAddIcon
    });
  }

  return (
    <nav className='side-bar'>
      {navItems.map((navItem, index) => (<SideBarItem key={index} item={navItem} />))}
    </nav>
  );
}

export default SideBar;