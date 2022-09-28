const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();
const { Server: ServerHTTP } = require("http");
const { Server: IOServer } = require("socket.io");
const Firebase = require("./utils/ContenedorFirebase.js");
const auth = require("./middlewares/authMDW");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const mensajes = new Firebase("mensajeria");
const app = express();
const httpserver = new ServerHTTP(app);
const io = new IOServer(httpserver);
const prod = require("./api/productosFaker.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 36000},
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: advancedOptions,
    }),
  })
);

app.get("/api/productos-test", auth, async (req, res) => {
  let user = req.session.user
  res.render("index",{ root: __dirname, user});
});

app.get("/api/productos-test/login", async (req, res) => {
  res.render("login", { root: __dirname });
});

app.post("/api/productos-test/login", (req, res) => {
  const { user, pass } = req.body;
  if (user !== "carlos" || pass !== "123456") {
    return res.send("<h1>No se pudo autenticar el usuario.</h1>");
  }
  req.session.user = user;
  req.session.admin = true;
  res.redirect('http://localhost:8080/api/productos-test/')
});

app.get('/api/productos-test/logout', (req, res) => {
  let user = req.session.user
  req.session.destroy(err => {
    if (err) {
      return res.json({ status: 'Logout ERROR', body: err })
    }
    res.render('logout',{user})
  })
 })
 
let data = {}

io.on("connection", async (socket) => {
  console.log("User Connected");
  let productos = prod;
  let messages = await mensajes.getAll();
  let comp = await mensajes.getCompRate();

  data = {
    messages,
    productos,
    comp
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
