//IMPORTAMOS EL MODELO
import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

// CREAOS U NUEVO USUARIO Y LO GURADAMOS A LA BD
const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;
    // await BÑLOQUEA ESTA LINEA BUSCA SI EL USUARIO EXISTE 
    const existeUsuario = await Usuario.findOne({ email });
  
    if (existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg: error.message });
    }
  
    try {
      // ACEDEMOS A LOS DATOS INGRESADOS POR EL USUARIO body
      const usuario = new Usuario(req.body);
      // GENERANDO TOKEN UNICO
      usuario.token = generarId();
      // ESPERAMOS HASTA QUE FINALIZE LA INSERCION A LA BD
      await usuario.save();
  
     
  
      res.json({
        msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
      });
    } catch (error) {
      console.log(error);
    }
};

// AUTENTICACION DE USUARIO
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password en el modelo 
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      // GENERAREMOS JSON TOKEN CON EL ID DEL USUARIO
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El Password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

// BOTON CONFIRMAR
const confirmar = async (req, res) => {
  // ACCEDEMOS A LOS DATOS req.params
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }
  // SI EL USUARIO EXISTE ACTUALIZAMOS EL TOKEN YA QUE ES DE UN SOLO USO 
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

  
export {registrar, autenticar, confirmar};
