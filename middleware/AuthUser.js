import User from "../models/UserModel.js";
export const veryfyUser= async (req,res,next)=>{
    if (!req.session.userId){
        return res.status(401).json({msg:"Mohon login ke akun Anda"});
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg:"User tidak ditemukan"});
    req.userId=user.id;
    req.role=user.role;
    next();
}
export const adminOnly= async (req,res,next)=>{
    if (!req.session.userId){
        return res.status(401).json({msg:"Mohon login ke akun Anda"});
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg:"User tidak ditemukan"});
   if (user.role!=="admin") return res.status(404).json({msg:"Akses terlarang"});
    next();
}