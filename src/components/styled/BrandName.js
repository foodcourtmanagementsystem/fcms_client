import './BrandName.css';
import * as settings from '../../config/settings';

function BrandName() {
  return (
    <div className='brand-name'>
        {settings.BRAND_NAME}
    </div>
  );
}

export default BrandName;