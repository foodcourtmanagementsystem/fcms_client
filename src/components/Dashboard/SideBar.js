import './SideBar.css';
import {NavLink} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';


const SideBarItem = ({item}) => {

  const {to, Icon, title} = item;

  return (
    <NavLink to={to} end={true} className={navItem => navItem.isActive ? 'side-bar-item active' : 'side-bar-item'}>
      {Icon && <Icon className='side-bar-item__icon' />}
      <div className='side-bar-item__title'>{title}</div>
    </NavLink>
  );

}

function SideBar() {

  const navItems = [
    {
      to: "",
      title: "Dashboard",
      Icon: DashboardIcon
    },
    {
      to: "foodcategories",
      title: "Food Categories",
      Icon: RestaurantIcon
    },
    {
      to: "fooditems",
      title: "Food Items",
      Icon: FastfoodIcon
    },
    {
      to: "orders",
      title: "Orders",
      Icon: BookOnlineIcon
    },
   /* {
      to: "salesreport",
      title: "Sales Report",
      Icon: AnalyticsIcon
    },*/
    {
      to: "profile",
      title: "Profile",
      Icon: AccountCircleIcon
    },
    {
      to: "settings",
      title: "Settings",
      Icon: SettingsIcon
    }
  ];

  return (
    <nav className='side-bar'>
      {navItems.map((navItem, index) => (<SideBarItem key={index} item={navItem} />))}
    </nav>
  );
}

export default SideBar;