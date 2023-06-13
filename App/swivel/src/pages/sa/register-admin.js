import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/add_SAdmin.module.css";
import axios from "axios";
import SANavbar from "@/components/SA/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function AddSAdmin() {
  const router = useRouter();

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      //router.push("/auth/login");
    }
  });

  const [name, setName] = useState("");
  const [paternalLN, setpaternalLN] = useState("");
  const [maternalLN, setmaternalLN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badPw, setBadPw] = useState(false);
  const [success, setSuccess] = useState(false);

  const [confPassword, setConfPassword] = useState("");
  const [confPasswordHelper, setConfPasswordHelper] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    surnameP: false,
    surnameM: false,
    email: false,
    password: false,
    confPassword: false,
    phone: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  let passStatus = null;

  const disabledFirst = () => {
    for (const key in errors) {
      if (errors[key]) return true;
    }
    return !(name && surname && email && password && confPassword && phone);
  };
  const disabledSecond = () => {
    for (const key in errors) {
      if (errors[key]) return true;
    }
    return !(street && exterior_num && city && state && postalCode);
  };

  const submitHandler = async () => {
    setIsLoading(true);

    if (password != confirmPassword) {
      setBadPw(true);
      setIsLoading(false);
      return;
    } else {
      setBadPw(false);
    }

    await axios.post(
      "/api/register",
      JSON.stringify({
        nombres: name,
        apellidos: paternalLN + maternalLN,
        email: email,
        numero_telefonico: phone,
        password: password,
        tipo_usuario: "admin",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
    setSuccess(true);
    setIsLoading(false);
  };

  const cancelHandler = () => {
    router.back();
  };

  const inputLabelProps = {
    shrink: true,
  };

  return (
    <div>
      <SANavbar />
      {isLoading && <LoadingScreen />}
      <div className={styles.mainContainer}>
        <h2 className={styles.pageTitle}>Agregar administrador</h2>
        <h4 className={styles.sectionTitle}>
          Ingresa los datos del administrador
        </h4>
        <div className={styles.inputContainer}>
          <h5>Nombre(s)</h5>
          <TextField
            className={styles.inputField}
            id="nombre"
            value={name}
            disabled={loading}
            error={errors.name}
            helperText={errors.name ? "Solo letras" : ""}
            onChange={(e) => {
              const v = e.target.value;
              setName(v);
              if (
                !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
                  v
                )
              ) {
                setErrors({ ...errors, name: true });
              } else {
                setErrors({ ...errors, name: false });
              }
            }}
            sx={{
              marginRight: "0.5vw",
            }}
            variant="outlined"
            fullWidth
            InputLabelProps={inputLabelProps}
            placeholder="Ingrese su nombre"
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.inputContainer}>
            <h5>Apellido Paterno</h5>
            <TextField
              className={styles.inputFieldLeft}
              id="apellidoPaterno"
              value={paternalLN}
              disabled={loading}
              error={errors.surnameP}
              helperText={errors.surnameP ? "Solo letras" : ""}
              onChange={(e) => {
                const v = e.target.value;
                setpaternalLN(v);
                if (
                  !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
                    v
                  )
                ) {
                  setErrors({ ...errors, surnameP: true });
                } else {
                  setErrors({ ...errors, surnameP: false });
                }
              }}
              sx={{
                marginLeft: "0.5vw",
              }}
              variant="outlined"
              fullWidth
              InputLabelProps={inputLabelProps}
              placeholder="Ingrese su apellido paterno"
              //   onChange={(e) => setpaternalLN(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <h5>Apellido Materno</h5>
            <TextField
              className={styles.inputField}
              id="apellidoMaterno"
              value={maternalLN}
              disabled={loading}
              error={errors.surnameM}
              helperText={errors.surnameM ? "Solo letras" : ""}
              onChange={(e) => {
                const v = e.target.value;
                setmaternalLN(v);
                if (
                  !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
                    v
                  )
                ) {
                  setErrors({ ...errors, surnameM: true });
                } else {
                  setErrors({ ...errors, surnameM: false });
                }
              }}
              sx={{
                marginLeft: "0.5vw",
              }}
              variant="outlined"
              fullWidth
              InputLabelProps={inputLabelProps}
              placeholder="Ingrese su apellido materno"
              //   onChange={(e) => setmaternalLN(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <h5>Correo</h5>
          <TextField
            className={styles.longInputField}
            id="correo"
            value={email}
            disabled={loading}
            error={errors.email}
            helperText={errors.email ? "Correo electrónico inválido" : ""}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);
              if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                setErrors({ ...errors, email: true });
              } else {
                setErrors({ ...errors, email: false });
              }
            }}
            variant="outlined"
            fullWidth
            InputLabelProps={inputLabelProps}
            placeholder="Ingrese su correo electrónico"
            // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <h5>Teléfono</h5>
          <TextField
            className={styles.longInputField}
            id="telefono"
            value={phone}
            disabled={loading}
            error={errors.phone}
            helperText={errors.phone ? "Teléfono inválido" : ""}
            onChange={(e) => {
              const v = e.target.value;
              setPhone(v);
              if (v.length < 10 || v.length > 10 || !/^\d+$/.test(v)) {
                setErrors({ ...errors, phone: true });
              } else {
                setErrors({ ...errors, phone: false });
              }
            }}
            variant="outlined"
            fullWidth
            InputLabelProps={inputLabelProps}
            placeholder="Ingrese su número de teléfono"
            // onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <h5>Contraseña</h5>
          <TextField
            className={styles.longInputField}
            id="password"
            type="password"
            value={password}
            disabled={loading}
            error={errors.password}
            helperText={errors.password ? confPasswordHelper : ""}
            onChange={(e) => {
              const v = e.target.value;
              setPassword(v);
              if (
                v.length < 6 ||
                !/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v) ||
                !/\w/.test(v) ||
                !/\d/.test(v)
              ) {
                setErrors({ ...errors, password: true });
                if (v.length < 6) {
                  setConfPasswordHelper(
                    "La contraseña debe tener al menos 6 caracteres"
                  );
                } else if (!/[a-zA-Z]/.test(v)) {
                  setConfPasswordHelper(
                    "La contraseña debe tener al menos una letra"
                  );
                } else if (!/\d/.test(v)) {
                  setConfPasswordHelper(
                    "La contraseña debe tener al menos un digito"
                  );
                } else if (!/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v)) {
                  setConfPasswordHelper(
                    "La contraseña debe tener al menos un caracter especial"
                  );
                }
              } else {
                setErrors({ ...errors, password: false });
                setConfPasswordHelper("");
              }
            }}
            variant="outlined"
            fullWidth
            InputLabelProps={inputLabelProps}
            placeholder="Ingrese su contraseña"
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <h5>Confirmar contraseña</h5>
          <TextField
            className={styles.longInputField}
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            variant="outlined"
            fullWidth
            InputLabelProps={inputLabelProps}
            placeholder="Confirme su contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            className={styles.button}
            disableElevation
            sx={{
              backgroundColor: "#979797",
              fontFamily: "lato",
              fontWeight: "bold",
              ":hover": { backgroundColor: "#BABABA" },
            }}
            onClick={cancelHandler}
          >
            Regresar
          </Button>
          {!success && (
            <Button
              type="submit"
              variant="contained"
              className={styles.button}
              disableElevation
              onClick={submitHandler}
              sx={{
                backgroundColor: "#F55C7A",
                fontFamily: "lato",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#BABABA" },
              }}
            >
              Guardar
            </Button>
          )}
          {badPw && <div> Passwords don&apos;t match.</div>}
          {success && <div> User created successfully </div>}
        </div>
      </div>
    </div>
  );
}
