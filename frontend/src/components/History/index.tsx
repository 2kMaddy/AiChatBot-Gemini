import Navbar from '../Navbar';
import Header from '../Header';
import { UserAuth } from '../../context/AuthContext';
import './index.css';
import { HistoryPageList } from '../HistoryItems';

const History = () => {
  const auth = UserAuth() || null;
  const { isDarkMode } = auth || {};
  const darkClass = isDarkMode ? 'dark' : '';

  return (
    <div className={`history-page ${darkClass}`}>
      <div className="nav-col">
        <Navbar id={'HISTORY'} />
      </div>
      <div className="right-col">
        <Header title={"History"}/>
        <div className="history-content">
          <ul className="history-list">
            <HistoryPageList />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default History;
