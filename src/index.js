import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io"
const app = express()

//  to use websockets, we dont need to listen the app, instead we will use http module to create a server and then pass it to the websocket server

const server = http.createServer(app)
const io = new Server(server)
 
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message)
    })
})


app.use(express.static(path.resolve("./public")))
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
})


server.listen(3000, () => {
    console.log("Server is running on port 3000")
})  