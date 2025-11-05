import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
         try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    //   try {
    //     const response = await fetch('http://localhost:5000/tickets');
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle ticket resolution
  const handleResolve = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'resolved'
        })
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        // Update tickets list to reflect the change
        setTickets(tickets.map(ticket => 
          ticket.id === ticketId ? updatedTicket : ticket
        ));
      } else {
        console.error('Failed to resolve ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Support Tickets</h2>
          
          {loading ? (
            <div className="text-center py-4">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No tickets found</div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                    <button
                      onClick={() => handleResolve(ticket.id)}
                      className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      Resolve
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;