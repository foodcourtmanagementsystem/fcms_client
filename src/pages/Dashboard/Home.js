import './Home.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {NavLink} from 'react-router-dom';

const Service = ({service}) => {
  const {to, title, Icon} = service;
  return (
    <NavLink to={to} className="service">
      <Icon className="icon service__icon" />
      <div className="service__title">{title}</div>
    </NavLink>
  );
}

function Home() {

  const services = [
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
    {
      to: "payments",
      title: "Payments",
      Icon: PaymentsIcon
    },
    {
      to: "users",
      title: "Users",
      Icon: PeopleIcon
    },
    {
      to: "salesreport",
      title: "Sales Report",
      Icon: AnalyticsIcon
    },
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
    <div className="dashboard-home">
      {services.map((service, index) => (<Service key={index} service={service} />))}
    </div>
  );
}

export default Home;