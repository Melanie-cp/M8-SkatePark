import { SkaterModel } from "../models/skaters.model.js"
import { handleErrorDatabase } from '../database/errors.database.js';
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// /api/v1/skaters/skaters
const getAllSkaters = async (req, res) => {
    try {
        const skaters = await SkaterModel.getAll()
        return res.status(200).json({ skaters })
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

// /api/v1/skaters/login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const skater = await SkaterModel.findOneByEmail(email);

        if (!skater) {
            return res.status(401).json({ ok: false, msg: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, skater.password);

        if (!validPassword) {
            return res.status(401).json({ ok: false, msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ email: skater.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ ok: true, token });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
}

// /api/v1/skaters/register
const register = async (req, res) => {
    try {
        const { email, nombre, password, anos_experiencia, especialidad } = req.body;

        if (!req.files || !req.files.foto) {
            return res.status(400).json({ ok: false, msg: 'No se ha subido ninguna foto' });
        }

        const foto = req.files.foto;

        const existingSkater = await SkaterModel.findOneByEmail(email);
        if (existingSkater) {
            return res.status(400).json({ ok: false, msg: 'El email ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const uploadPath = path.join(__dirname, '../public/assets/images/', foto.name);
        await foto.mv(uploadPath);

        const skater = await SkaterModel.create({
            email,
            nombre,
            password: hashedPassword,
            anos_experiencia,
            especialidad,
            foto: foto.name
        });

        return res.status(201).json({ ok: true, skater });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
};

// /api/v1/skaters/edit
const updateSkater = async (req, res) => {
    try {
        const { email, nombre, password, anos_experiencia, especialidad } = req.body;

        // Generar nuevo hash de la contraseña si se proporciona
        let hashedPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const skater = {
            email,
            nombre,
            password: hashedPassword,
            anos_experiencia,
            especialidad
        };

        const updatedSkater = await SkaterModel.update(skater);
        return res.json(updatedSkater);
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
}

// /api/v1/skaters/admin
const updateState = async (req, res) => {
    try {
        const { email, estado } = req.body;
        const skater = await SkaterModel.updateState(email, estado);
        return res.json({ ok: true, skater });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
}

// /api/v1/skaters/delete
const removeSkater = async (req, res) => {
    try {
        const { email } = req.body
        const skater = await SkaterModel.remove(email)
        return res.status(201).json({ ok: true, skater });
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
}


export const SkaterController = {
    getAllSkaters,
    login,
    register,
    updateSkater,
    updateState,
    removeSkater
}