import express from "express";
import {adminOnly, veryfyUser,requireLogin} from "../middleware/AuthUser.js";
import {AdminView, UserView,RegisterView,LoginView,ErrorView,ResetPasswordView} from "../controllers/Views.js";
const router = express.Router();
router.get('/admin',veryfyUser,adminOnly,AdminView);
router.get('/user',veryfyUser,UserView);
router.get('/register',RegisterView);
router.get('/login',requireLogin,LoginView);
router.get('/',adminOnly);
router.get('/error',ErrorView)
export default router;