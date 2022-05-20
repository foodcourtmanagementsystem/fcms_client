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
import ConfirmEmail from '../pages/ConfirmEmail';
import NotFound from '../pages/NotFound';
import FoodCategory from '../pages/FoodCategory';
import ResetPassword from '../pages/ResetPassword';
import ConfirmResetPassword from '../pages/ConfirmResetPassword';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import {useSelector} from 'react-redux';
import Search from '../pages/Search';

function Content() {

    const user = useSelector(state => state.user.data);

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
            path: "/search",
            Component: Search
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
            path: "/user/confirmemail/:userId",
            Component: ConfirmEmail
        },
        {
            path: "/user/resetpassword",
            Component: ResetPassword
        },
        {
            path: "/user/confirmresetpassword/:userId",
            Component: ConfirmResetPassword
        },
        {
            path: "/user/profile",
            Component: Profile
        },
        {
            path: "/user/settings",
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