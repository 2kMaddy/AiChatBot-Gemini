import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ChatPage from './components/ChatPage';
import History from './components/History';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/signup" element={<AuthPage page={'signup'} />} />
        <Route path="/login" element={<AuthPage page={'login'} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/bad-path" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
