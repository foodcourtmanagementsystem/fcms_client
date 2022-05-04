import './BrandLogo.css';
import logo from '../../img/logo.png';
import * as settings from '../../config/settings';

function BrandLogo({style}) {
  return (
    <div className="brand-logo-container">
        <img src={logo} style={style} className="brand-logo" alt={`${settings.BRAND_NAME} Logo`} title={`${settings.BRAND_NAME} Logo`} />
    </div>
  );
}

export default BrandLogo;