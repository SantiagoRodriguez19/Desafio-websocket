'use strict'

import { io } from '../app.js'
import ProductManager from '../controllers/ProductManager.js'

const product = new ProductManager()

export async function socketHandle(req, res, next) {
  const products = await product.getProduct()
  io.emit('updateList', {
    list: products,
    showList: products.length > 0,
  })
}