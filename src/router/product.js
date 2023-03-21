import { Router } from "express"
import ProductManager from "../controllers/ProductManager.js"
import { socketHandle } from "../middleware/socket.js"

const ProductRouter = Router()
const product = new ProductManager()



ProductRouter.get("/", async(req, res) =>{
    let limit = parseInt(req.query.limit);
    if(!limit){res.send(await product.getProduct())}
         else{
            let allProducts =  await product.getProduct()
            let productLimit = allProducts.slice(0, limit)
            res.send(await productLimit)
        }
})

ProductRouter.get("/:id", async(req, res) =>{
    let id = parseInt(req.params.id)
    res.send(await  product.getProductById(id))
})

ProductRouter.post("/", async(req, res, next) =>{
    let newProduct = req.body
    await socketHandle()

    res.send(await product.addProducts(newProduct))
    


    /*const  newProducts = product.getProduct()
    req['io'].sockets.emit('actualizar', newProducts)
    res.send(newProduct)*/
})


ProductRouter.put("/:id", async (req, res) =>{
    let  id = parseInt(req.params.id)
    let updateProduct =req.body
    res.send (await product.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    res.send (await product.deleteProducts(id))
}) 


export default ProductRouter