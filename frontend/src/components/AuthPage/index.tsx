import { UserAuth } from '../../context/AuthContext';
import { AuthForm } from '../AuthForm';
import './index.css';

interface Props {
  page: string;
}

const AuthPage = (props: Props) => {
  const auth = UserAuth();
  const { page } = props;
  const { isDarkMode, toggleDarkMode } = auth || {};
  const darkClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`container ${darkClass}`}>
      <div className="left-row">
        <div className={`form-container ${darkClass}`}>
          <AuthForm page={page} darkClass={darkClass} />
        </div>
      </div>
      <div className="right-row">
        <div className="auth-page-card">
          <h1>AI Chatbot</h1>
          <p>AI-powered virtual assistant</p>
          <div className={`theme-toggle-btn-container ${darkClass}`}>
            <button
              className={isDarkMode ? undefined : 'active-btn'}
              type="button"
              onClick={toggleDarkMode}
            >
              Light mode
            </button>
            <button
              className={isDarkMode ? 'active-btn' : undefined}
              type="button"
              onClick={toggleDarkMode}
            >
              Dark mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
