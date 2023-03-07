import User from "../models/UserModel.js";
export const veryfyUser= async (req,res,next)=>{
    if (!req.session.userId){
        return res.render('pages/login', { title: 'Mi aplicación Node.js' });
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) {
        res.render('pages/register', { title: 'Mi aplicación Node.js' });
    };
    req.userId=user.id;
    req.role=user.role;
    next();
}

export const adminOnly= async (req,res,next)=>{
    if (!req.session.userId){
        return res.render('pages/login', { title: 'Mi aplicación Node.js' });
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) {
        return res.render('pages/register', { title: 'Mi aplicación Node.js' });
    };
    if (user.role!=="admin"){
        return res.render('pages/user', { title: 'Mi aplicación Node.js' });
    };
    req.userId=user.id;
    req.role=user.role;
    next();
}
