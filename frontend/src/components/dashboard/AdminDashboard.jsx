import { useState } from 'react';
import { Users, Ticket, AlertCircle, CheckCircle2 } from 'lucide-react';

const AdminDashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0
  });

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Ticket className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Total Tickets</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-orange-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Open Tickets</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.openTickets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Resolved</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.resolvedTickets}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition flex items-center space-x-2">
            <Users size={18} className="text-purple-600" />
            <span>Manage Users</span>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition flex items-center space-x-2">
            <Ticket size={18} className="text-blue-600" />
            <span>All Tickets</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="divide-y">
              {/* Activity items will go here */}
              <div className="text-center py-4 text-gray-500">
                No recent activity
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;