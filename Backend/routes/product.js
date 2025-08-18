import express from "express";
import {
  getProducts,
  addProduct,
  markHotSelling,
  unmarkHotSelling,
  deleteProduct,
  editProduct,
  getCategories,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.post("/add", upload.single("image"), addProduct);
router.patch("/:id/hotselling", markHotSelling);
router.patch("/:id/unmark-hotselling", unmarkHotSelling);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("image"), editProduct);

export default router;
