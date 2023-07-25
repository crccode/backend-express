//IMPORTAMOS EL MODELO
import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";

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
  
export {registrar};
