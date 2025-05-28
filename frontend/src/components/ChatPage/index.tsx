import React, { useRef, useEffect, useState } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import Header from '../Header';
import Navbar from '../Navbar';
import { UserAuth } from '../../context/AuthContext';
import { getResponseFromGemini } from '../../helpers/apiCommunicators';
import ChatBubbles from '../ChatBubbles';
import './index.css';

const ChatPage = () => {
  const auth = UserAuth() || null;
  const { isDarkMode } = auth || {};
  const darkClass = isDarkMode ? 'dark' : '';
  const [activeSessionId, setActiveSessionId] = useState('newChat');
  type ChatMessage = {
    sender: 'user' | 'ai';
    message: string;
    timestamp?: Date;
  };

  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const submitPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const newChat = {
      sender: 'user',
      message: userPrompt,
      timestamp: new Date(),
    };
    setChats((prevChats) => [...prevChats, newChat]);
    console.log(chats);
    setUserPrompt('');
    setIsLoading(true);
    if (!userPrompt.trim()) {
      return alert('Please enter a prompt.');
    }
    const response = await getResponseFromGemini(userPrompt, activeSessionId);

    const aiResponse = {
      sender: 'ai',
      message: response.message || 'No response from AI',
      timestamp: new Date(),
    };
    setActiveSessionId(response.sessionId || 'newChat');
    setChats((prevChats) => [...prevChats, aiResponse]);
    setIsLoading(false);
  };

  const handleTextareaSubmit = (e: any) => {
    if (e.code === 'Enter') {
      console.log(e.code);
      submitPrompt(e);
    }
  };

  return (
    <div className={`chat-page-container ${darkClass}`}>
      <div className="nav-col">
        <Navbar id={'STARTCHAT'} />
      </div>
      <div className="right-col">
        <Header title={'AI Chat'} />
        <div className="chat-section">
          <div className="chat-bubble-section" ref={chatContainerRef}>
            {chats.length === 0 ? (
              <h1>What can I help you with?</h1>
            ) : (
              <ChatBubbles chats={chats} />
            )}
          </div>
          <form className="user-prompt-section" onSubmit={submitPrompt}>
            <textarea
              placeholder="Ask me anything..."
              value={userPrompt}
              className="user-prompt-input"
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={handleTextareaSubmit}
            />
            {isLoading ? (
              <div className="loader-btn">
                <MoonLoader
                  color="#c5198d"
                  size={24}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <button type="submit" className="send-btn">
                <BsFillArrowUpSquareFill />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
