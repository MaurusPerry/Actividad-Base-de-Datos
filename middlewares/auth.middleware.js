import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */

    try{
        if(!req.headers.authorization)
            return res.status(401).json({message: "No puede acceder."});

        const token = req.headers.authorization.split(" ")[1];

        if (!token) 
            return res.status(400).json({message: "Formato invalido de token."});

        const payload = await jwt.verify(token, "secret");
        console.log(payload);

        if (!payload.id) 
            return res.status(400).json({ message: "El token no contiene un ID de usuario."});
    
        req.id = parseInt(payload.id);

        console.log(req.id);

        next();

    } catch (error){
        res.status(500).json({message: message.error});
    }

};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */

    const id = req.params.id; 

    try {
        const usuario = await UsuariosService.getUsuarioById(id);
        if (!usuario.admin) 
            return res.status(403).json({ message: "Acceso denegado. No eres administrador." });

        next();
    
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};
