import express from "express";
import {
    getUserByid,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/User.js";
const router = express.Router();
router.get('/users',getUser);
router.get('/users/:id',getUserByid);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

export default router;