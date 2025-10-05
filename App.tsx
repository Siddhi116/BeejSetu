import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './components/Landing';
import Auth from './components/Auth';
import FarmerDashboard from './components/FarmerDashboard';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('/');
  const { isAuthenticated } = useAuth();

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage !== '/' && currentPage !== '/auth') {
      return <Landing onNavigate={navigate} />;
    }

    switch (currentPage) {
      case '/':
        return <Landing onNavigate={navigate} />;
      case '/auth':
        return <Auth onNavigate={navigate} />;
      case '/farmer-dashboard':
        return <FarmerDashboard onNavigate={navigate} />;
      case '/wallet':
        return <Wallet onNavigate={navigate} />;
      case '/profile':
        return <Profile onNavigate={navigate} />;
      case '/leaderboard':
        return <Leaderboard onNavigate={navigate} />;
      case '/admin-dashboard':
        return <AdminDashboard onNavigate={navigate} />;
      default:
        return <Landing onNavigate={navigate} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
