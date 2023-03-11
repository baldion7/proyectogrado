import express from "express";
import jwt from'jsonwebtoken';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';
import {SendEmail} from "../controllers/Services.js";
import User from "../models/UserModel.js";
const router = express.Router()
router.get('/send-email',SendEmail );
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: 'baldionkevin8@gmail.com',
        pass: 'ugybilyxncucyhvg'
    }
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.render('forgot-password', { message: 'No se encontró una cuenta con ese correo electrónico' });
    }

    const hashedPassword = await argon2.hash("new_password_here"); // <-- Define la variable hashedPassword aquí

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
    const url = `http://localhost:5000/reset-password/${token}`;

    await user.update({ password: hashedPassword });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Restablecimiento de contraseña',
        text: `Haga clic en este enlace para restablecer su contraseña: ${url}`,
        html: `<p>Haga clic en <a href="${url}">este enlace</a> para restablecer su contraseña.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.render('forgot-password', { message: 'Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña' });
});

router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.render('reset-password', { message: 'El enlace de restablecimiento de contraseña no es válido o ha expirado' });
        }

        res.render('reset-password', { token });
    });
});

router.post('/reset-password', async (req, res) => {
    const { token, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        return res.render('reset-password', { message: 'Las contraseñas no coinciden' });
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) {
            return res.render('reset-password', { message: 'El enlace de restablecimiento de contraseña no es válido o ha expirado' });
        }

        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.render('reset-password', { message: 'No se encontró una cuenta con ese correo electrónico' });
        }

        const  hashPassword = await argon2.hash(password);
        console.log(hashPassword+password)

        await user.update({ password: hashPassword });
        res.render('reset-password', { message: 'Se ha restablecido su contraseña con éxito' });
    });
});

        export default router;