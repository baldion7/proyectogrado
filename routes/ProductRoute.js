import express from "express";
import {
    getProducts,
    getProductsByid,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controllers/Products.js";
import {veryfyUser} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/products',veryfyUser,getProducts);
router.get('/api/products/:id',veryfyUser,getProductsByid);
router.post('/api/products',veryfyUser,createProducts);
router.patch('/api/products/:id',veryfyUser,updateProducts);
router.delete('/api/products/:id',veryfyUser,deleteProducts);

export default router;