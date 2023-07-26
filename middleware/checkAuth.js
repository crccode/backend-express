import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  // VERIFICAMOS QUE EL USUARIO EXISTA Y SEA VALIDO
  let token;
  // Bearer PODEMOS VERIFICAR SI SE ESTA MANDANDO EL TOKEN EN HEADER 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // DIVIDIMOS LA CADENA EN DOS POR QUE HAY UN ESPACIO DE SEPARACION Y ME QUEDO CON EL PRIMERO 
      token = req.headers.authorization.split(" ")[1];
      // VERIFICAMOS EL TOKEN USAMOS LA MISMA LLAVE CON LA QUE LO CREAMOS
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // EL JWT TIENE EL ID DEL USUARIO select NO TOMA EL PASSWORD YA NO LO ASIGNA AL request
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );
      // UNA VEZ VERIFICADO VAMOS AL SIGUIENTE MIDDLEWARE
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
