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
router.get('/api/users',veryfyUser,adminOnly,getUser);
router.get('/api/users/:id',veryfyUser,adminOnly,getUserByid);
router.post('/api/users',veryfyUser,adminOnly,createUser);
router.patch('/api/users/:id',veryfyUser,adminOnly,updateUser);
router.delete('/api/users/:id',veryfyUser,adminOnly,deleteUser);

export default router;