import './Content.css';
import Footer from './Footer';
import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Dashboard/Home';
import FoodCategory from '../../pages/Dashboard/FoodCategory';
import FoodItem from '../../pages/Dashboard/FoodItem';
import Order from '../../pages/Dashboard/Order';
import Payment from '../../pages/Dashboard/Payment';
import SalesReport from '../../pages/Dashboard/SalesReport';
import Profile from '../../pages/Profile';
import Settings from '../../pages/Settings';
import NotFound from '../../pages/NotFound';

function Content() {

    const routes = [
        {
            path: "",
            Component: Home
        },
        {
            path: "foodcategories",
            Component: FoodCategory
        },
        {
            path: "fooditems",
            Component: FoodItem
        },
        {
            path: "orders",
            Component: Order
        },
        {
            path: "payments",
            Component: Payment
        },
        {
            path: "salesreport",
            Component: SalesReport
        },
        {
            path: "profile",
            Component: Profile
        },
        {
            path: "settings",
            Component: Settings
        },
        {
            path: "*",
            Component: NotFound
        }
    ];

  return (
    <main className='content-container'>
        <section className='content'>
            <Routes>
                {routes.map(({path, Component}, index) => (<Route key={index} path={path} element={<Component />} />))}
            </Routes>
        </section>
        <Footer />
    </main>
  );
}

export default Content;