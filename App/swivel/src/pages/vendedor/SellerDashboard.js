import { useState, useEffect } from 'react';
import axios from 'axios';

const SellerDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get('/api/DrivingRequestsSeller');
    setRequests(res.data);
  };

  const updateRequestStatus = async (id, status) => {
    await axios.put(`/api/DrivingRequestsSeller/${id}/status`, { status });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.customerName}</td>
              <td>{request.status}</td>
                {/*}
              <td>
                {request.status === 'Pending' && (
                  <select
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                )}
                {request.status === 'Completed' && <span>Request Completed</span>}
                {request.status === 'Rejected' && <span>Request Rejected</span>}
              </td>
                */}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerDashboard;
