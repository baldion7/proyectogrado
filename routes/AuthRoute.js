import express from "express";
import {Login,logOut,Me,AdminView,UserView} from "../controllers/Auth.js"
import {veryfyUser, adminOnly} from "../middleware/AuthUser.js";
const router = express.Router();
router.get('/me',Me);
router.post('/login',Login);
router.delete('/logout',logOut);
router.get('/admin',veryfyUser,adminOnly,AdminView);
router.get('/usuario',veryfyUser,UserView)
export default router;