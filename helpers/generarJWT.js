import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  // NOS PERMITE GENERAR EL JSON
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // EL TIEMPO QUE VA A ESTAR VIGENTE ESTE TOKEN 
    expiresIn: "30d",
  });
};
export default generarJWT;
