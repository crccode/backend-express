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

// ESTE CODIGO SE EJECUTA ANTES DE AGREGAR EL REGISTRO A LA BD LEER LA DOC
usuarioSchema.pre("save", async function (next) {
  // ESTA FUNCION VERIFICA QUE ESTE CAMPO NO HAYA SIDO CAMBIADO 
  if (!this.isModified("password")) {
    next(); // SE EJECUTA EL SIGUIENTE MIDLEWARE 
  }
  // GENERA 10 RONDAS 
  const salt = await bcrypt.genSalt(10);
  // this.password HACEMOS REFERENCIA AL OBJETO
  this.password = await bcrypt.hash(this.password, salt);
});

// COMPROBAR PASSWORD
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

// HACEMOS REFERENCIA AL MODELO 
const Usuario = mongoose.model("Usuario", usuarioSchema);
// HACEMOS DISPONIBLE LA VARIABLE 
export default Usuario;
