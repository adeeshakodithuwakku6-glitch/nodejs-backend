import express from 'express'
import { createProduct } from '../Controllers/productControl.js'
import { getAllProducts } from '../Controllers/productControl.js'
import { deleteProduct } from '../Controllers/productControl.js'
import { updateProduct } from '../Controllers/productControl.js'
import { getProductByID } from '../Controllers/productControl.js'

const productRouter = express.Router()

productRouter.post("/" , createProduct)
productRouter.get("/" , getAllProducts)
productRouter.delete("/:x" , deleteProduct)
productRouter.put("/:x" , updateProduct)
productRouter.get("/:x" , getProductByID)

export default productRouter