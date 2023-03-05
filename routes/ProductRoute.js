import express from "express";
import {
    getProducts,
    getProductsByid,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controllers/Products.js";
const router = express.Router();
router.get('/products',getProducts);
router.get('/products/:id',getProductsByid);
router.post('/products',createProducts);
router.patch('/products/:id',updateProducts);
router.delete('/products/:id',deleteProducts);

export default router;