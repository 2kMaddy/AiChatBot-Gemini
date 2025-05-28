import {useState} from 'react';
import { Link } from 'react-router-dom';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { BiSolidDashboard } from 'react-icons/bi';
import { RiChatHistoryFill } from 'react-icons/ri';
import './index.css';

const navListItems = [
  {
    displayText: 'Dashboard',
    id: 'DASHBOARD',
    icon: <BiSolidDashboard />,
    path: '/',
  },
  {
    displayText: 'Start Chat',
    id: 'STARTCHAT',
    icon: <LuCircleFadingPlus />,
    path: '/chat',
  },
  {
    displayText: 'History',
    id: 'HISTORY',
    icon: <RiChatHistoryFill />,
    path: '/history',
  },
];

interface Props {
  id: string;
}

const Navbar = (props: Props) => {
  const [activePage, setActivePage] = useState(props.id);
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const { name } = userDetails || 'Guest';

  const changeNavItem = (id: string) => {
    setActivePage(id);
  };

  return (
    <div className="nav-bar-container">
      <div className="top-col">
        <h1>AI Chatbot</h1>
        <hr />
        <ul className="nav-items-container">
          {navListItems.map((each) => (
            <Link to={each.path} className="nav-link">
              <div
                key={each.id}
                className={`list-item-container ${
                  activePage === each.id ? 'active-nav-item' : ''
                }`}
                onClick={() => changeNavItem(each.id)}
              >
                <div className="nav-icon">{each.icon}</div>
                <li key={each.id}>{each.displayText}</li>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className="profile">
        <hr />
        <div className="profile-name">
          <div className="avatar">{name[0] || 'G'}</div>
          <p>{name || 'Guest'}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
