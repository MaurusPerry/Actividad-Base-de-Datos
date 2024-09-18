import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */

    const usuario = req.body;
    const password = req.body.password;
    const email = req.body.email;
    const saltRounds = 10;

    if (!usuario)
        return res.status(400).json({ message: "Se requiere un usuario." });

    if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.password)
        return res.status(400).json({ message: "Todos los campos deben de encontrase llenos." });

    try {
        const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);

        if (usuarioExistente)
            return res.status(400).json({ message: "Ya existe un usuario con este mail." });

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash); 

        usuario.password = hash;

        await UsuariosService.createUsuario(usuario);
        res.status(201).json({ message: "Usuario creado con éxito." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) 
        return res.status(400).json({ message: "Se necesita un email y una contraseña." });

    try {  

        const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);

        if (!usuarioExistente)
            return res.status(404).json({ message: "Usuario con email no encontrado." });

        const match = await bcrypt.compare(password, usuarioExistente.password);

        if (!match)
            return res.status(400).json({ message: message.error });

        const token = await jwt.sign({ id: usuarioExistente.id }, "secret", { expiresIn: "30m" });
        return res.status(200).json({ usuario: {
            id: usuarioExistente.id,
            email: usuarioExistente.email,
            nombre: usuarioExistente.nombre,
            apellido: usuarioExistente.apellido,
            admin: usuarioExistente.admin,
        }, token });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { register, login };
