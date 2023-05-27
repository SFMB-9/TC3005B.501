import { useState } from "react";
import { useRouter } from 'next/router';
import createGA from "@/pages/api/GA/createGA";

const registroAgencia = () => {

    const [agencia, setAgencia] = useState({
        nombre_GA: "",
        direccion_GA: "",
        telefono_GA1: "",
        telefono_GA2: "",
        email_GA: "",
        url_web: "",
        nombre_representante: "",
        email_representante: "",
        telefono_representante: "",
    });
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(agencia);
        
        const _id = await createGA(agencia);

        setAgencia({
            nombre_GA: "",
            direccion_GA: "",
            telefono_GA1: "",
            telefono_GA2: "",
            email_GA: "",
            url_web: "",
            nombre_representante: "",
            email_representante: "",
            telefono_representante: "",
        });

        documentosGA(_id);
    };    

    const documentosGA = (_id) => {
        const router = useRouter();
        router.query = { _id: _id};
        router.push('/providers/GA/documentosGA');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" onChange={e => setAgencia({ ...agencia, nombre: e.target.value })} />
                </label>
                <label>
                    Direccion:
                    <input type="text" name="direccion" onChange={e => setAgencia({ ...agencia, direccion: e.target.value })} />
                </label>
                <label>
                    Telefono:
                    <input type="text" name="telefono" onChange={e => setAgencia({ ...agencia, telefono: e.target.value })} />
                </label>
                <label>
                    Telefono2:
                    <input type="text" name="telefono2" onChange={e => setAgencia({ ...agencia, telefono2: e.target.value })} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={e => setAgencia({ ...agencia, email: e.target.value })} />
                </label>
                <label>
                    UrlWeb:
                    <input type="text" name="urlWeb" onChange={e => setAgencia({ ...agencia, urlWeb: e.target.value })} />
                </label>
                <label>
                    Nombre del Representante:
                    <input type="text" name="nombreRepresentante" onChange={e => setAgencia({ ...agencia, nombreRepresentante: e.target.value })} />
                </label>
                <label>
                    Email del Representante:
                    <input type="text" name="emailRepresentante" onChange={e => setAgencia({ ...agencia, emailRepresentante: e.target.value })} />
                </label>
                <label>
                    Teléfono del Representante:
                    <input type="text" name="telefonoRepresentante" onChange={e => setAgencia({ ...agencia, telefonoRepresentante: e.target.value })} />
                </label>
                <button type="submit" > Siguiente </button>
            </form>
        </div>
    )


}

export default registroAgencia;