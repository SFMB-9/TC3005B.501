import React from "react";

export default function CrearAgencia() {
  // Agregar aqui los documentos
  const docsTypes = [
    "Cédula de ciudadanía",
    "Cédula de extranjería",
    "Pasaporte",
    "Permiso especial",
    "Tarjeta de identidad",
    "Registro civil",
    "NIT",
    "RUT",
    "Cámara de comercio",
  ];

  const [nombres, setNombres] = useState("");
  const [tipo_usuario, setTipo_usuario] = useState("");
  const [email, setEmail] = useState("");
  const [numero_telefonico, setNumero_telefonico] = useState("");
  const [gerente_id, setGerente_id] = useState("");
  const [horas_min, setHoras_min] = useState("");
  const [horas_max, setHoras_max] = useState("");
  const [dias_anticipo, setDias_anticipo] = useState("");
  const [dias_max, setDias_max] = useState("");
  const [direccion, setDireccion] = useState({});
  const [url_agencia, setUrl_agencia] = useState("");
  const [documentos_requeridos_compra, setDocumentos_requeridos_compra] =
    useState([]); // Array from selector

  const handleCheck = (event) => {
    var updatedList = [...documentos_requeridos_compra];
    if (event.target.checked) {
      updatedList = [...documentos_requeridos_compra, event.target.value];
    } else {
      updatedList.splice(
        documentos_requeridos_compra.indexOf(event.target.value),
        1
      );
    }
    setDocumentos_requeridos_compra(updatedList);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nombres,
        tipo_usuario,
        email,
        numero_telefonico,
        gerente_id,
        horas_min,
        horas_max,
        dias_anticipo,
        dias_max,
        direccion,
        url_agencia,
      };
      const response = await fetch(
        "http://localhost:3000/api/GA/crear-agencia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Agencia</h1>
      <form>
        <label htmlFor="nombres">Nombres</label>
        <input
          type="text"
          name="nombres"
          id="nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        <label htmlFor="userType">Tipo de usuario</label>
        <input
          type="text"
          name="userType"
          id="userType"
          value={tipo_usuario}
          onChange={(e) => setTipo_usuario(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="numero_telefonico">Numero telefonico</label>
        <input
          type="text"
          name="numero_telefonico"
          id="numero_telefonico"
          value={numero_telefonico}
          onChange={(e) => setNumero_telefonico(e.target.value)}
        />
        <label htmlFor="gerente_id">Gerente</label>
        <input
          type="text"
          name="gerente_id"
          id="gerente_id"
          value={gerente_id}
          onChange={(e) => setGerente_id(e.target.value)}
        />
        <label htmlFor="horas_min">Horas min</label>
        <input
          type="text"
          name="horas_min"
          id="horas_min"
          value={horas_min}
          onChange={(e) => setHoras_min(e.target.value)}
        />
        <label htmlFor="horas_max">Horas max</label>
        <input
          type="text"
          name="horas_max"
          id="horas_max"
          value={horas_max}
          onChange={(e) => setHoras_max(e.target.value)}
        />
        <label htmlFor="dias_anticipo">Dias de anticipo</label>
        <input
          type="text"
          name="dias_anticipo"
          id="dias_anticipo"
          value={dias_anticipo}
          onChange={(e) => setDias_anticipo(e.target.value)}
        />
        <label htmlFor="dias_max">Dias max</label>
        <input
          type="text"
          name="dias_max"
          id="dias_max"
          value={dias_max}
          onChange={(e) => setDias_max(e.target.value)}
        />
        <label htmlFor="direccion">Direccion</label>
        <input
          type="text"
          name="direccion"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <label htmlFor="url_agencia">Url agencia</label>
        <input
          type="text"
          name="url_agencia"
          id="url_agencia"
          value={url_agencia}
          onChange={(e) => setUrl_agencia(e.target.value)}
        />
        <div className="checkList">
          <div className="title">Documentos requeridos al comprador:</div>
          <div className="list-container">
            {docsTypes.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" onClick={onSubmit}>
          Crear Agencia
        </button>
      </form>
    </div>
  );
}
