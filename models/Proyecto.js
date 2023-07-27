import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema(
  {
    // CREAMOS LOS CAMPOS QUE TENDRA LA TABLA
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    // TIENE RELACION CON USUARIO GUARDAMOS LA REFENCIA DE QUIEN CREA EL PROYECTO
    creador: { //SOLO PUEDE HABER UN OBJETO
      // TODOS LOS USUARIOS TIENEN ESTE CAMPO HACEMOS REFERENCIA
      type: mongoose.Schema.Types.ObjectId,
      // HACEMOS REFENCIA AL MODELO Usuario
      ref: "Usuario",
    },
    tareas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarea",
      },
    ],
    // PONEMOS [] LO CUAL SIGNIFICA QUE PUEDE HABER MAS DE UNO 
    colaboradores: [ // ARREGLO DE USUARIO 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectosSchema);
export default Proyecto;
