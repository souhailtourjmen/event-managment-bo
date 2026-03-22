import React from 'react';
import { LayoutDashboard, Calendar, Users, Settings } from 'lucide-react';
import ThemeToggle from '../atoms/ThemeToggle';

interface TemplateProps {
  children: React.ReactNode;
}

const DashboardTemplate: React.FC<TemplateProps> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setActiveTab(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">
            Event Manager
          </h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <a 
            href="#dashboard" 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center p-3 rounded-xl transition-all ${
              activeTab === 'dashboard' ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-text-main hover:bg-background'
            }`}
          >
            <LayoutDashboard className={`mr-3 ${activeTab === 'dashboard' ? 'text-on-primary' : ''}`} size={20} />
            Dashboard
          </a>
          <a 
            href="#events" 
            onClick={() => setActiveTab('events')}
            className={`flex items-center p-3 rounded-xl transition-all ${
              activeTab === 'events' ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-text-main hover:bg-background'
            }`}
          >
            <Calendar className={`mr-3 ${activeTab === 'events' ? 'text-on-primary' : ''}`} size={20} />
            Évènements
          </a>
          <a 
            href="#clients" 
            onClick={() => setActiveTab('clients')}
            className={`flex items-center p-3 rounded-xl transition-all ${
              activeTab === 'clients' ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-text-main hover:bg-background'
            }`}
          >
            <Users className={`mr-3 ${activeTab === 'clients' ? 'text-on-primary' : ''}`} size={20} />
            Clients
          </a>
        </nav>
        <div className="p-4 border-t border-border">
          <a href="#" className="flex items-center p-3 rounded-xl text-text-main hover:bg-background transition-all">
            <Settings className="mr-3" size={20} />
            Paramètres
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <h2 className="text-lg font-bold text-text-main">Tableau de Bord</h2>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-text-main hidden sm:inline-block">Souhail</span>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-lg shadow-primary/20">
                S
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardTemplate;
