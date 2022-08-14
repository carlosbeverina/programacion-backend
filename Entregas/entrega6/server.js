const express = require("express");
const Contenedor = require("./contenedor");
const { Server: ServerHTTP } = require("http");
const { Server: IOServer } = require("socket.io");

const contenedor = new Contenedor("./productos.txt");
const mensajes = new Contenedor("./mensajes.txt");
const app = express();
const httpserver = new ServerHTTP(app);
const io = new IOServer(httpserver);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", { root: __dirname });
});

io.on("connection", async (socket) => {
  console.log("User Connected");
  let productos = await contenedor.getAll();
  let messages = await mensajes.getAll();
  const data = {
    messages,
    productos,
  };

  socket.on("add-product", async (product) => {
    await contenedor.save(product);
    data.productos = await contenedor.getAll();
    io.sockets.emit("message-server", data);
  });

  socket.on("add-message", async (msg) => {
    await mensajes.save(msg);
    data.messages = await mensajes.getAll();
    io.sockets.emit("message-server", data);
  });

  socket.emit("message-server", data);
});

const PORT = process.env.PORT || 8080;
const server = httpserver.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});
