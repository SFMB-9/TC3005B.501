import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const manageGA = () => {
    const router = useRouter();

    const [grupo, setGA] = useState();
    const [admins, setAdmins] = useState();

    const getGA = async () => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                //this id is for testing purposes only
                id: "6448b23e9b381e63ff823f7f"
            }
        });
        setGA(response.data.userData);
    };

    const getAdmins = async () => {
        const response = await axios.get("/api/GA/getAdmins", {
            params: {    
                GA: GA.nombre_GA
            }
        });
        console.log(response.data);
        setAdmins(response.data.admins);
    } 


    useEffect(() => {
        const fetchData = async () => {
            await getGA();
        }
        fetchData();
    }
        , []);

  

    return (
        <div>
            <div>
                <h1>Información General</h1>
                {console.log(grupo)}
                <h2>Nombre: {grupo?.nombre_GA}</h2>
                <h2>Telefono: {grupo?.telefono_GA1}</h2>
                <h2>Email: {grupo?.email_GA}</h2>
                <h2>Dirección: {grupo?.direccion_GA}</h2>
            </div>
            <div>
                <h1>Administradores</h1>
                <button onClick={() => router.push(`/providers/GA/registroAdmin?GA=${GA?.nombre}`)}>+</button>
                <table>
                {admins?.map((admin) => (
                    <tr>
                        <td>{admin.nombre}</td>
                        <td>{admin.email}</td>
                        <td>{admin.telefono}</td>
                    </tr>
                ))}
                </table>
    
            </div>
        </div>

    )   
}
export default manageGA;






