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
router.get('/products',veryfyUser,getProducts);
router.get('/products/:id',veryfyUser,getProductsByid);
router.post('/products',veryfyUser,createProducts);
router.patch('/products/:id',veryfyUser,updateProducts);
router.delete('/products/:id',veryfyUser,deleteProducts);

export default router;