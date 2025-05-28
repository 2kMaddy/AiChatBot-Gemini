import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './index.css';

const NotFound = () => {
  const auth = UserAuth() || null;
  const { isDarkMode } = auth || {};
  const darkClass = isDarkMode ? 'dark' : '';
  return (
    <div className={`not-found-page ${darkClass}`}>
      <img src="not-found.png" className="not-found-img" />
      <p>We apologize, but the page you requested could not be found.</p>
      <Link to="/">
        <button type="button" className="not-found-btn">
          Return to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
