import  User from "../models/UserModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Ingrese un correo electrónico y una contraseña" });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Contraseñas incorrectas" });

    req.session.userId = user.id;
    const name = user.name;
    const lastname = user.lastname;
    const email = user.email;
    const rol = user.role;

    if (rol === "admin") {
       return  res.redirect("/admin");
    } else if (rol === "user") {
        res.redirect("/user");
    } else {
      return   res.redirect("/login");
    }
};

export const Me = async (req,res)=>{
   if (!req.session.userId){
       return res.status(401).json({msg:"Por favor, ingrese a su cuenta"});
   }
   const user= await User.findOne({
       attributes:['id','name','lastname','email','rol'],
       where:{
           id: req.session.userId
       }
    });
   if (!user) return res.status(404).json({msg:"Usuario no encontrado"});
   res.status(200).json(user);
};
export const logOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No puedo cerrar sesión"})
        res.status(200).json({msg:"has cerrado la sesión"});
    })
}
