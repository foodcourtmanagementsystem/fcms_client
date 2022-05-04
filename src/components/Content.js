import './Content.css';
import Footer from './Footer';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import FoodItem from '../pages/FoodItem';
import Payment from '../pages/Payment';
import Cart from '../pages/Cart';
import OrderAndHistory from '../pages/OrderAndHistory';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SalesReport from '../pages/SalesReport';
import NotFound from '../pages/NotFound';
import FoodCategory from '../pages/FoodCategory';


function Content() {

    const routes = [
        {
            path: "/",
            Component: Home
        },
        {
            path: "/foodcategory/:id",
            Component: FoodCategory
        },
        {
            path: "/fooditem/:id",
            Component: FoodItem
        },
        {
            path: "/cart",
            Component: Cart
        },
        {
            path: "/payment",
            Component: Payment
        },
        {
            path: "/orderandhistory",
            Component: OrderAndHistory
        },
        {
            path: "/user/signin",
            Component: SignIn
        },
        {
            path: "/user/signup",
            Component: SignUp
        },
        {
            path: "/salesreport",
            Component: SalesReport
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