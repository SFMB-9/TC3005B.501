import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";


const registroAgencia = () => {

    const router = useRouter();

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

    const postAgencia = async () => { 
        const response = await axios.put("http://localhost:3000/api/GA/createGA", {
            agencia: agencia,
            //this id is for testing purposes only
            id : "6448b23e9b381e63ff823f7f"
        });
        console.log(response.data);
        return response.data._id;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const _id = await postAgencia();

        setAgencia((prevAgencia) => ({
          ...prevAgencia,
          nombre_GA: "",
          direccion_GA: "",
          telefono_GA1: "",
          telefono_GA2: "",
          email_GA: "",
          url_web: "",
          nombre_representante: "",
          email_representante: "",
          telefono_representante: "",
        }));
      
        documentosGA(_id);
      };
      

    const documentosGA = (_id) => {
        router.push(`/providers/GA/documentosGA?_id=${_id}`);
      };
      

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" onChange={e => setAgencia({ ...agencia, nombre_GA: e.target.value })} />
                </label>
                <label>
                    Direccion:
                    <input type="text" name="direccion" onChange={e => setAgencia({ ...agencia, direccion_GA: e.target.value })} />
                </label>
                <label>
                    Telefono:
                    <input type="text" name="telefono" onChange={e => setAgencia({ ...agencia, telefono_GA1: e.target.value })} />
                </label>
                <label>
                    Telefono2:
                    <input type="text" name="telefono2" onChange={e => setAgencia({ ...agencia, telefono_GA2: e.target.value })} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={e => setAgencia({ ...agencia, email_GA: e.target.value })} />
                </label>
                <label>
                    UrlWeb:
                    <input type="text" name="urlWeb" onChange={e => setAgencia({ ...agencia, url_web: e.target.value })} />
                </label>
                <label>
                    Nombre del Representante:
                    <input type="text" name="nombreRepresentante" onChange={e => setAgencia({ ...agencia, nombre_representante: e.target.value })} />
                </label>
                <label>
                    Email del Representante:
                    <input type="text" name="emailRepresentante" onChange={e => setAgencia({ ...agencia, email_representante: e.target.value })} />
                </label>
                <label>
                    Teléfono del Representante:
                    <input type="text" name="telefonoRepresentante" onChange={e => setAgencia({ ...agencia, telefono_representante: e.target.value })} />
                </label>
                <button type="submit" > Siguiente </button>
            </form>
        </div>
    )


}

export default registroAgencia;