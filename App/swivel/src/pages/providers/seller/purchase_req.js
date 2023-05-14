import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const SellerDashboard = () => {
    const router = useRouter();
    
    // user object is a map of user id to user data
    const [user, setUser] = useState(null);

    // Filter the requests by status
    const [statusFilter, setStatusFilter] = useState('all');


    // requests is an array of request objects
    const [requests, setRequests] = useState([]);

    const { seller_id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Get all requests
            const requestRes = await axios.get('/api/DrivingRequestsSeller/drivingRequest', {
            params: {
                vendedor_id: seller_id,
                tipo_proceso: "pruebaManejo"
            }
            });

            const requests = requestRes.data.procesos;
            // Get all unique user ids
            const userIds = [...new Set(requests.map(request => request.usuario_final_id))];
            // Get all users
            const userPromises = userIds.map(id => axios.get(`/api/managerProfile/managerP?id=${id}`));
            const userRes = await Promise.all(userPromises);
            
            // Create a map of user id to user data
            const users = userRes.reduce((acc, res) => {
            const userData = res.data.userData;
            return {
                ...acc,
                [userData._id]: userData
            };
            }, {});

            // Set the requests and users state
            setRequests(requests);
            setUser(users);
        } catch (error) {
            console.log(error);
        }
        };

        fetchData();
    }, []);

    // Update the status of a request
    const updateRequestStatus = async (_id, status) => {
        await axios.put('/api/DrivingRequestsSeller/updateRequestStatus', { _id, status });
        const updatedRequests = requests.map(request => {
        if (request._id === _id) {
            return { ...request, status };
        } else {
            return request;
        }
        });
        setRequests(updatedRequests);
    };

    // Navigate to a new page to view the details of the request
    const viewRequest = (id,user_id) => {
        router.push({
        pathname: '/viewRequest',
        query: { id, user_id },
        });
    };

        return (
            <div>
            <h1>Seller Dashboard</h1>
            <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            >
            <option value="all">All</option>
            <option value="En_Revision">En Revision</option>
            <option value="Aceptada">Aceptada</option>
            <option value="Rechazada">Rechazada</option>
            </select>
            <table>
                <thead>
                <tr>
                    <th>Auto</th>
                    <th>Cliente</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {requests
                .filter((request) => {
                    if (statusFilter === 'all') {
                    return true;
                    } else {
                    return request.status === statusFilter;
                    }
                })
                .map((request) => (
                    <tr key={request._id}>
                    <td>{request.auto?
                        `${request.auto.marca} ${request.auto.modelo}`
                        :"Este proceso no contiene auto"}</td>
                    <td>{/* If the user object is not null, display the user's name*/}
                        {user[request.usuario_final_id]
                        ? `${user[request.usuario_final_id].nombres} ${user[request.usuario_final_id].apellidos}`
                        : "Usuario no encontrado"}
                    </td>
                    <td>
                        {/* updateRequestStatus is called when the select value changes */}
                        <select
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request._id, e.target.value)}
                        >
                        <option value="En_Revision">En_Revision</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rechazada</option>
                        </select>
                        {/* viewRequest is called when the button is clicked */}
                        <button onClick={() => viewRequest(request._id, request.usuario_final_id)}>View Details</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );      
};

export default SellerDashboard;

