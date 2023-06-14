import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const manageGA = () => {
    const router = useRouter();

    const [GA, setGA] = useState();
    const [admin, setAdmin] = useState();
    const [admins, setAdmins] = useState();
    const [admin_id, setA_id] = useState();

    const getAdmin = async (id) => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                id: id
            }
        });
        setAdmin(response.data.userData);
    };

    const getGA = async (id) => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                id: id
            }
        });
        setGA(response.data.userData);
    };

    const getAdmins = async () => {
        const response = await axios.get("/api/GA/getAdmins", {
            params: {    
                id: GA._id
            }
            
        });
        setAdmins(response.data.userData);
    } 

    useEffect(() => {
        setA_id("6477e6faae27e558e56c3c1f");
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            console.log(admin_id); 
            if (admin_id) 
                await getAdmin(admin_id);
            
        };
        fetchData();
    }, [admin_id]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(admin);
            if (admin) 
                await getGA(admin.grupo_automotriz_id);
            };
        fetchData();
    }, [admin]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(GA);
            if (GA)
                await getAdmins();
        };
        
        fetchData();
    }, [GA]);

    return (
        <div>
            <div>
                <h1>Información General</h1>
                <h2>Nombre: {GA?.nombres}</h2>
                <h2>Telefono: {admin?.numero_telefonico}</h2>
                <h2>Email: {GA?.legal.email}</h2>
                <h2>Dirección: {GA?.direccion.calle + GA?.direccion.numero_exterior + GA?.direccion.numero_interior + GA?.direccion.ciudad + GA?.direccion.estado + GA?.direccion.pais + GA?.direccion.codigo_postal}</h2>
            </div>
            <div>
                <h1>Administradores</h1>
                <button onClick={() => router.push(`/providers/GA/registroAdmin?GA=${GA?.nombre}`)}>+</button>
                <table>
                    {console.log(admins)}
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Email</th>
                        </tr>

                    </thead>

                {admins?.map((object) => (
                    <tr>
                        <td>{object.nombres}</td>
                        <td>{object.numero_telefonico}</td>
                        <td>{object.email}</td>
                    </tr>
                    
                ))}
                </table>
    
            </div>
        </div>
    );   
};

export default manageGA;



