import React from 'react';
import { AppView } from '../types';

const SidebarIcon: React.FC<{ name: string }> = ({ name }) => {
    const iconClass = "w-6 h-6";
    switch(name) {
        case 'dashboard': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
        case 'calendar': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
        case 'team': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
        case 'reports': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 17.5l-2.8-2.8A7 7 0 1 0 8 15a7 7 0 0 0 4.2-1.3l2.8 2.8z"></path><path d="M12 11V6"></path></svg>;
        case 'settings': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
        default: return null;
    }
};

interface NavItemProps {
    icon: string;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors w-full text-left ${active ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
        <SidebarIcon name={icon} />
        <span className="font-medium">{label}</span>
    </button>
);

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarContent: React.FC<Pick<SidebarProps, 'currentView' | 'onNavigate'>> = ({ currentView, onNavigate }) => (
     <div className="w-64 bg-secondary text-white p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 mb-10 pt-4">
        <div className="bg-primary p-2 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        </div>
        <h1 className="text-2xl font-bold">Zenith</h1>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem icon="dashboard" label="Dashboard" active={currentView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon="calendar" label="Team Calendar" active={currentView === 'calendar'} onClick={() => onNavigate('calendar')} />
        <NavItem icon="team" label="My Team" active={currentView === 'team'} onClick={() => onNavigate('team')} />
        <NavItem icon="reports" label="Reports" active={currentView === 'reports'} onClick={() => onNavigate('reports')} />
      </nav>
      <div>
        <NavItem icon="settings" label="Settings" active={currentView === 'settings'} onClick={() => onNavigate('settings')}/>
      </div>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className={`relative h-full w-64 bg-secondary transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <SidebarContent currentView={currentView} onNavigate={onNavigate} />
          </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
          <SidebarContent currentView={currentView} onNavigate={onNavigate} />
      </div>
    </>
  );
};

export default Sidebar;
