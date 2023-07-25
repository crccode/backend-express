import mongoose from "mongoose";
import bcrypt from "bcrypt";

// DEFIINIMOS EL SCHEMA
const usuarioSchema = mongoose.Schema(
  {
    // COOCAMOS TODOS LOS CAMPOS QUE REQUERIMOS DEL USUARIO 
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // NO PERMITE VALORES DUPLICADOS
      unique: true,
    },
    token: {
      type: String,
    },
    // UNA VEZ QUE SE CREE EL USUARIO CAMBIA A TRUE
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  // CREA DOS COLUMNAS UNA DE CREADO Y DE ACTUALIZADO
  {
    timestamps: true,
  }
);

// HACEMOS REFERENCIA AL MODELO 
const Usuario = mongoose.model("Usuario", usuarioSchema);
// HACEMOS DISPONIBLE LA VARIABLE 
export default Usuario;
