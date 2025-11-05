import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import SupportDashboard from '../components/dashboard/SupportDashboard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
        <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="fixed w-full top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Ticketing System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                <span className="font-medium">{user.username}</span>
                <span className="ml-2 text-sm text-gray-500">({user.role})</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition inline-flex items-center space-x-2"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome, {user.username}!
              </h2>
              <p className="text-gray-600 mt-2">
                Role: <span className="font-semibold text-purple-600 capitalize">{user.role}</span>
              </p>
            </div>
            
            {/* Render appropriate dashboard based on user role */}
            {user.role === 'admin' && <AdminDashboard user={user} />}
            {user.role === 'support' && <SupportDashboard user={user} />}
            {user.role === 'user' && <UserDashboard user={user} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
