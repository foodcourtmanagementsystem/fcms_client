import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';

function App() {
  return (
    <div className="app">
        <Header />
        <div className='section-group'>
            <SideBar />
            <Content />
        </div>
    </div>
  );
}

export default App;
