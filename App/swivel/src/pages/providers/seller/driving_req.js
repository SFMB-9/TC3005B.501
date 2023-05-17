import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";


const SellerDashboard = () => {
    // user object is a map of user id to user data
    const [user, setUser] = useState(null);

    const [statusFilter, setStatusFilter] = useState('all');

    // requests is an array of request objects
    const [requests, setRequests] = useState([]);
    
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
        
        try {
            // Get all requests
            const requestRes = await axios.get('/api/DrivingRequestsSeller/drivingRequest', {
            params: {
                vendedor_id: session.id,
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

        if(session){
            fetchData();
        }
    }, [session]);

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
                    <th>Fecha</th>
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
                        ? `${user[request.usuario_final_id].name} ${user[request.usuario_final_id].surname}`
                        : "Usuario no encontrado"}
                    </td>
                    <td>{request.fecha_agendada}</td>
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
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );      
};

export default SellerDashboard;

