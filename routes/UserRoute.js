import express from "express";
import {
    getUserByid,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/User.js";
import {veryfyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/users',veryfyUser,adminOnly,getUser);
router.get('/users/:id',veryfyUser,adminOnly,getUserByid);
router.post('/users',veryfyUser,adminOnly,createUser);
router.patch('/users/:id',veryfyUser,adminOnly,updateUser);
router.delete('/users/:id',veryfyUser,adminOnly,deleteUser);

export default router;