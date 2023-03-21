
//'use strict'

import { Router } from 'express' 
import ProductManager from '../controllers/ProductManager.js'

const ViewsRouter = Router()
const product = new ProductManager()


const RENDER_PATH = {
    STATIC: 'index.handlebars',
    DINAMIC: 'realTimeProducts.handlebars'
  }


ViewsRouter.get("/", async (req, res, next) =>{
    let allProducts = await product.getProduct()
    res.render(RENDER_PATH.STATIC,{
      title: "Handlebars",
      list: [...allProducts],
      listExist: allProducts.length > 0
    })
  })
  
  
  
  ViewsRouter.get("/realtimeproducts", async (req, res,next) =>{
    let allProducts = await product.getProduct()
    res.render(RENDER_PATH.DINAMIC,{
      mainTitle: "Handlebars",
      list: [...allProducts],
      showList: allProducts.length > 0
    })
  })


  export default ViewsRouter
  