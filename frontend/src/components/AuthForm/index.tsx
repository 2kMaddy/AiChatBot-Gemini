import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { useState, CSSProperties } from 'react';
import { userLogin, userSignup } from '../../helpers/apiCommunicators';
import { Link, useNavigate } from 'react-router-dom';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

interface Props {
  page: string;
  darkClass: string;
}

export const AuthForm = (props: Props) => {
  const { page, darkClass } = props;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await userSignup(name, email, password);
      if (response.id) {
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await userLogin(email, password);
      if (response.id) {
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setIsLoading(false);
  };

  const signUpForm = () => {
    return (
      <form onSubmit={handleSignup}>
        <h1>Sign in</h1>
        <p>Enter your details to sign in</p>
        <div className="input-container">
          <label htmlFor="userName">
            Name<span>*</span>
          </label>
          <input
            className={darkClass}
            id="userName"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="userEmail">
            Email<span>*</span>
          </label>
          <input
            id="userEmail"
            type="text"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="userPassword">
            Password<span>*</span>
          </label>
          <div className="password-container">
            <input
              id="userPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={`show-password ${darkClass}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <button type="submit" className="auth-form-submit-btn">
          {isLoading ? (
            <div className="loader">
              <BeatLoader
                color="white"
                cssOverride={override}
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            'Signin'
          )}
        </button>
        {error && <p className="error-msg">*{error}</p>}
        <p>
          Already registered? <Link to="/login">login</Link>
        </p>
      </form>
    );
  };

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>Log in</h1>
        <p>Enter email and password to log in</p>
        <div className="input-container">
          <label htmlFor="userEmail">
            Email<span>*</span>
          </label>
          <input
            id="userEmail"
            type="text"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="userPassword">
            Password<span>*</span>
          </label>
          <div className="password-container">
            <input
              id="userPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <button type="submit" className="auth-form-submit-btn">
          {isLoading ? (
            <div className="loader">
              <BeatLoader
                color="white"
                cssOverride={override}
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            'Login'
          )}
        </button>
        {error && <p className="error-msg">*{error}</p>}
        <p>
          Not yet registered? <Link to="/signup">Click here</Link>
        </p>
      </form>
    );
  };

  switch (page) {
    case 'signup':
      return signUpForm();
    case 'login':
      return LoginForm();
    default:
      return <p>Page not found or invalid route.</p>;
  }
};
