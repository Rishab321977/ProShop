import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct) // Protect route with authMiddleware.js
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct) // Protect route with authMiddleware.js

export default router
