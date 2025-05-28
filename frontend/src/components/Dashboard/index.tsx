import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HistoryDashBoardList } from '../HistoryItems';
import { UserAuth } from '../../context/AuthContext';
import './index.css';
import Navbar from '../Navbar';
import Header from '../Header';

const Dashboard = () => {
  const auth = UserAuth() || null;
  const { isDarkMode } = auth || {};
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const { name } = userDetails || 'Guest';

  const darkClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`container-dashboard ${darkClass}`}>
      <div className="nav-col">
        <Navbar id={'DASHBOARD'} />
      </div>
      <div className="right-col">
        <Header title={"Dashboard"}/>
        <div className="top-section">
          <div className="welcome-msg">
            <h1>Welcome, {name}</h1>
            <p>Start to chat with your AI assistant by click the button</p>
            <Link to="/chat">
              <button type="button" className="get-started-btn">
                Get started
              </button>
            </Link>
          </div>
        </div>
        <div className="history-section">
          <div className="history-viewall">
            <p className="bold-font">History</p>
            <Link to="/history" className="view-all margin-top">
              View all
              <MdOutlineKeyboardDoubleArrowRight />
            </Link>
          </div>
          <div className="history-list-item-container">
            <ul className="dash-history-list">
              <HistoryDashBoardList />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
