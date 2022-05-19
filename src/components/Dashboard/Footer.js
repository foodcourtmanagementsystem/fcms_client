import './Footer.css';
import BrandName from '../styled/BrandName';
import BrandLogo from '../styled/BrandLogo';

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__bottom'>
            <div className='footer__bottom-brand'>
                <BrandLogo />
                <BrandName />
            </div>
            <div className='footer__bottom-copyright'>
                {new Date().getFullYear()} &copy; All Rights Reserved.
            </div>
        </div>

    </footer>
  );
}

export default Footer;