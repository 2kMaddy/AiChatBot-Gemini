import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MdDelete } from 'react-icons/md';
import { UserAuth } from '../../context/AuthContext';
import {
  userChatHistory,
  deleteChatById,
} from '../../helpers/apiCommunicators';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import './index.css';

interface Session {
  lastMessage: string;
  sessionTime: Date;
  sessionId: string;
}

const getChatHistory = async () => {
  await userChatHistory();
  const chatHistoryString = localStorage.getItem('chatHistory');
  const chatHistory = chatHistoryString ? JSON.parse(chatHistoryString) : null;
  return chatHistory;
};

const formatVideoAge = (sessionTime: Date) => {
  const ageOfVideo = formatDistanceToNow(new Date(sessionTime)).split(' ');
  if (ageOfVideo.length > 2) {
    ageOfVideo.shift();
  }
  ageOfVideo.push('ago');
  const formattedAge = ageOfVideo.join(' ');
  return formattedAge;
};

interface HistoryPageItemProps extends Session {
  deleteSessionById: (sessionId: string) => void;
}

const historyPageItemContainer = (props: HistoryPageItemProps) => {
  const { lastMessage, sessionTime, sessionId, deleteSessionById } = props;
  const formattedAge = formatVideoAge(sessionTime);

  const auth = UserAuth() || null;
  const { isDarkMode } = auth || {};
  const darkClass = isDarkMode ? 'dark' : '';
  return (
    <>
      <li className={`history-item ${darkClass}`} key={sessionId}>
        <div className="history-item-content">
          <p className="history-msg">{lastMessage}</p>
          <p className="history-time">{formattedAge}</p>
        </div>
        <button
          type="button"
          className={`delete-button ${darkClass}`}
          onClick={() => deleteSessionById(sessionId)}
        >
          <MdDelete />
        </button>
      </li>
    </>
  );
};

export const HistoryPageList = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    const history = await getChatHistory();
    setChatHistory(history || []);
    setIsLoading(false);
  };

  const deleteSessionById = async (sessionId: string) => {
    await deleteChatById(sessionId);
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader
            color="#c5198d"
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((each: Session) =>
          historyPageItemContainer({ ...each, deleteSessionById })
        )
      ) : (
        <div className="no-history">
          <h1>No Data Found</h1>
          <Link to="/chat">
            <button type="button" className="get-started-btn">
              Start Chat
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

const historyDashboardItem = (props: Session) => {
  const { lastMessage, sessionTime, sessionId } = props;
  const formattedAge = formatVideoAge(sessionTime);
  return (
    <li className="history-item-container" key={sessionId}>
      <h1 className="chat-title">{lastMessage}</h1>
      <p className="chat-time">{formattedAge}</p>
    </li>
  );
};

export const HistoryDashBoardList = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    const history = await getChatHistory();
    setChatHistory(history || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader
            color="#c5198d"
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : chatHistory && chatHistory.length > 0 ? (
        chatHistory.slice(-4).map((each: Session) => historyDashboardItem(each))
      ) : (
        <div className="no-history-dash">
          <h1>No History</h1>
        </div>
      )}
    </>
  );
};
