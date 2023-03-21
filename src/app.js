import express from "express"
import ProductRouter from "./router/product.js";
import CartRouter from "./router/carts.js";
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io"
import { socketHandle } from "./middleware/socket.js";
import   ViewsRouter   from "./router/viewsRouter.js";




const PORT = process.env.PORT || 8080;
const app = express()
app.use("/", express.static(__dirname + "/static"))

//const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", (__dirname + "/views"))



/*app.use((req, res, next)=>{
  req['io']=io
  next()
})*/




app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)
app.use("/", ViewsRouter)




const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
  });

server.on("error", (error) => console.log(`Error en servidor: ${error}`))

export const io = new Server(server)

io.on('connection', async clientSocket => {
 console.log(`Nuevo cliente conectado ${ clientSocket.id} `)
  await socketHandle()

/*io.on("connection", async socket =>{
    console.log("Nuevo cliente conectado")

    socket.on('nombre', data =>{
      console.log(data)
      socket.broadcaast.emit('actualizar', data)
    })
    //await socketHandle()*/
  })


/*app.listen(PORT, ()=>{
    console.log(`Servidor express puerto ${PORT}`)
})*/