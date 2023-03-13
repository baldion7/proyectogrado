import express from "express";
import {ResetPasswordView} from "../controllers/Views.js";
import {EmailForgotPassword,ResetPasswordToken,ResetPassword} from "../controllers/Services.js";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import argon2 from "argon2";
const router = express.Router()
router.get('/forgot-password',ResetPasswordView )
router.post('/forgot-password',EmailForgotPassword )
router.get('/reset-password/:token',ResetPasswordToken)
router.post('/reset-password',ResetPassword)

export default router;