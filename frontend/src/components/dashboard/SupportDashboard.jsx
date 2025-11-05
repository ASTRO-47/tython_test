import { useState } from 'react';
import { Ticket, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const SupportDashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0
  });

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.pendingTickets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">In Progress</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.inProgressTickets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Resolved</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.resolvedTickets}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Tickets</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition flex items-center justify-center space-x-2">
            <AlertCircle size={18} className="text-orange-600" />
            <span>Pending</span>
          </button>
          <button className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition flex items-center justify-center space-x-2">
            <Clock size={18} className="text-blue-600" />
            <span>In Progress</span>
          </button>
          <button className="p-3 border border-green-200 rounded-lg hover:bg-green-50 transition flex items-center justify-center space-x-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>Resolved</span>
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2">
            <Ticket size={18} className="text-gray-600" />
            <span>All Tickets</span>
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Tickets</h3>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="divide-y">
              {/* Ticket items will go here */}
              <div className="text-center py-4 text-gray-500">
                No tickets assigned
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;