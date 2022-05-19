import './Web.css';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Content from '../components/Content';

function Web() {

  return (
    <div className="web">
        <Header />
        <div className='section-group'>
            <SideBar />
            <Content />
        </div>
    </div>
  );
}

export default Web;
