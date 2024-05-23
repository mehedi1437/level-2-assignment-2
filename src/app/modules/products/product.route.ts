import express, { Request, Response } from "express";
import { productControllers } from "./product.controller";
const router = express.Router();

router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProduct);
router.get("/:productId", productControllers.getSpeceficProductById);
router.put("/:productId", productControllers.updateAProductById);
router.delete("/:productId", productControllers.deleteAProductById);

export const ProductRoutes = router;
