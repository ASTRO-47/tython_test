import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
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
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome, {user.username}!
            </h2>
            <p className="text-gray-600 mb-4">
              Role: <span className="font-semibold text-purple-600 capitalize">{user.role}</span>
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h3>
              <p className="text-gray-600">
                Your personalized dashboard based on your role will appear here.
              </p>
              {user.role === 'admin' && (
                <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="text-purple-700 font-medium">Admin Access</p>
                  <p className="text-purple-600 text-sm">You have full access to manage users and all tickets.</p>
                </div>
              )}
              {user.role === 'support' && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-blue-700 font-medium">Support Access</p>
                  <p className="text-blue-600 text-sm">You can view and update all tickets.</p>
                </div>
              )}
              {user.role === 'user' && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-green-700 font-medium">User Access</p>
                  <p className="text-green-600 text-sm">You can create and view your own tickets.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
