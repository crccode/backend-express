//IMPORTAMOS EL MODELO
import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";
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
  
      // Enviar el email de confirmacion
      emailRegistro({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token,
      });
  
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
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// OLVIDE PASSWORD
const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // Enviar el email
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

// COMPROBAR QUE EL USUARIO QUE ESTA QUERIENDO RECUPERAR EL PASSWORD
const comprobarToken = async (req, res) => {
  // EXTRAEMOS VALORES DE LA URL 
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token válido y el Usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

//NUEVO PASSWORD

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

// PERFIL
const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil};
