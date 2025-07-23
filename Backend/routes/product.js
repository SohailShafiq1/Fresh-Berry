import express from "express";
import {
  getProducts,
  addProduct,
  markHotSelling,
  unmarkHotSelling,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/add", upload.single("image"), addProduct);
router.patch("/:id/hotselling", markHotSelling);
router.patch("/:id/unmark-hotselling", unmarkHotSelling);

export default router;
