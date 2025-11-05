import { useState, useEffect } from 'react';
import { Plus, Ticket, Clock } from 'lucide-react';
import CreateTicketModal from '../tickets/CreateTicketModal';

const UserDashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tickets');
      }

      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="space-y-6">
      {/* Create Ticket Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={18} />
          <span>Create New Ticket</span>
        </button>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchTickets(); // Refresh tickets after creation
        }} 
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Ticket className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Total Tickets</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Clock className="text-orange-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Ticket className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Resolved</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">My Tickets</h3>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No tickets yet. Create your first ticket!
            </div>
          ) : (
            <div className="divide-y">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-gray-600 mt-1">{ticket.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium
                          ${ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                          ${ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                        `}
                      >
                        {ticket.status}
                      </span>
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium
                          ${ticket.priority === 'low' ? 'bg-gray-100 text-gray-800' : ''}
                          ${ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800' : ''}
                          ${ticket.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;