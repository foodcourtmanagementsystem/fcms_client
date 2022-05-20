import './Settings.css';
import ChangePassword from './ChangePassword';
import {useSelector} from 'react-redux';

function Settings() {
  const user = useSelector(state => state.user.data);

  return (
    <div className="settings">
      <h6 style={{
        margin: '0 10%',
        marginBottom: 30
      }}>Email: {user.email}</h6>
      <ChangePassword />
    </div>
  );
}

export default Settings;