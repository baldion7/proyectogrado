import jwt from'jsonwebtoken';
import nodemailer from 'nodemailer';
import argon2 from "argon2";
import User from "../models/UserModel.js";
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: 'baldionkevin8@gmail.com',
        pass: 'ugybilyxncucyhvg'
    }
});
export const EmailForgotPassword=async (req, res) => {
    console.log("hola")
    const {email} = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        return res.render('forgot-password');
    }


    const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
    const url = `http://localhost:5000/reset-password/${token}`;


    const mailOptions = {
        from: 'baldionkevin8@gmail.com',
        to: email,
        subject: 'Restablecimiento de contraseña',
        text: `Haga clic en este enlace para restablecer su contraseña: ${url}`,
        html: `<p>Haga clic en <a href="${url}">este enlace</a> para restablecer su contraseña.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.render('pages/forgot-password');
}
export const ResetPasswordToken = (req, res) => {
    const {token} = req.params;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.render('pages/reset-password');
        }

        res.render('pages/reset-password', {token});
    });
}
export const ResetPassword=async (req, res) => {
    const { token, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        return res.render('pages/reset-password');
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if (!decoded) {
            return res.render('pages/error' );
        }
        if (err) {
            return res.render('pages/reset-password' );
        }

        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.render('pages/reset-password' );
        }
        const  hashPassword = await argon2.hash(password);
        await User.update({name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: hashPassword,
            role: user.role },{ where: { id: user.id } });
        res.render('pages/error' );
    });
}


