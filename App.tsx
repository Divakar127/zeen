import React, { useState, useCallback } from 'react';
import { User, AppView } from './types';
import { useLeaveData } from './hooks/useLeaveData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TeamCalendar from './components/TeamCalendar';
import PlaceholderPage from './components/PlaceholderPage';
import SettingsPage from './components/SettingsPage';
import PolicyChatbot from './components/PolicyChatbot';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const leaveData = useLeaveData();
  const { users, addLoginTimestamp, updateUserPassword, updateUserAvatar } = leaveData;
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = users.find(u => u.id === currentUserId) || null;

  const handleLogin = useCallback((userId: string, password: string): boolean => {
    const user = users.find(u => u.id === userId);
    if (user && user.password === password) {
      addLoginTimestamp(userId);
      setCurrentUserId(userId);
      setCurrentView('dashboard'); // Reset to dashboard on login
      return true;
    }
    return false;
  }, [users, addLoginTimestamp]);

  const handleLogout = useCallback(() => {
    setCurrentUserId(null);
  }, []);

  const navigate = (view: AppView) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    if (!currentUser) return null;
    switch (currentView) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} leaveData={leaveData} />;
      case 'calendar':
        return <TeamCalendar currentUser={currentUser} leaveData={leaveData} />;
      case 'team':
        return <PlaceholderPage title="My Team" />;
      case 'reports':
        return <PlaceholderPage title="Reports" />;
      case 'settings':
        return <SettingsPage currentUser={currentUser} onUpdatePassword={updateUserPassword} onUpdateAvatar={updateUserAvatar} />;
      default:
        return <Dashboard currentUser={currentUser} leaveData={leaveData} />;
    }
  };

  if (!currentUser) {
    return <LoginPage users={users} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-light text-gray-800">
      <Sidebar currentView={currentView} onNavigate={navigate} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={currentUser}
          onLogout={handleLogout}
          onNavigateToSettings={() => navigate('settings')}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light p-4 sm:p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
      <button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-110"
        aria-label="Open AI Policy Chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="m12 14-4-4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </button>

      {isChatbotOpen && <PolicyChatbot onClose={() => setChatbotOpen(false)} />}
    </div>
  );
};

export default App;
