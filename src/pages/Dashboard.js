import './Dashboard.css';
import {useEffect} from 'react';
import Header from '../components/Dashboard/Header';
import SideBar from '../components/Dashboard/SideBar';
import Content from '../components/Dashboard/Content';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Dashboard() {

  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();


  useEffect(() => {
     if(!user.isAuthenticated || !user.roles.includes("Admin"))
     {
       navigate("/user/signin");
     }

  }, [user.isAuthenticated, user.roles]);

  return (
    <div className="dashboard">
        <Header />
        <div className='section-group'>
            <SideBar />
            <Content />
        </div>
    </div>
  );
}

export default Dashboard;
