import nodemailer from 'nodemailer';
export const SendEmail=(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'baldionkevin8@gmail.com',
            pass: 'ugybilyxncucyhvg'
        }
    });

    // Configurar el correo electrónico
    const mailOptions = {
        from: 'baldionkevin8@gmail.com',
        to: 'dractarus@gmail.com',
        subject: 'Prueba de correo electrónico con Node.js',
        text: 'Hola, esto es un correo de prueba enviado con Node.js'
    };

    // Enviar correo electrónico
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.redirect("/error");
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.redirect("/");
        }
    });
}