import './SplashScreen.css';
import BrandName from './BrandName';
import BrandLogo from './BrandLogo';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-screen__brand-logo-container"> 
        <BrandLogo style={{
          width: 150,
          height: 150
        }} />
      </div>
      <div className="splash-screen__brand-name-container">
          <BrandName />
      </div>
    </div>
  );
}

export default SplashScreen;