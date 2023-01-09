const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const {passport, usuariosDao} = require('./utils/passport/passport.js');
const RouterProductos = require('./utils/routes/productos.routes')
const RouterApi = require('./utils/routes/api.routes');
const RouterCarrito = require('./utils/routes/carrito.routes')
const {mensajesDao} = require('./utils/daos/index.js');
const { Server: ServerHTTP } = require("http")
const { Server: IOServer } = require("socket.io")


const app = express();
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
    rolling: true, 
    cookie: { httpOnly: true,
            secure: false,
            maxAge: parseInt(process.env.EXPIRATION)},
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: advancedOptions,
    }),
  })
);
app.use(passport.initialize())
app.use(passport.session())


passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  let usuario = usuariosDao.getByUser(user)
  done(null, usuario)
})

app.use('/productos',RouterProductos);
app.use('/carrito',RouterCarrito);
app.use('/', RouterApi);

app.all('*', (req,res)=>{
  res.send("<h1>Error 404</h1>")
})

const httpserver = new ServerHTTP(app);
const io = new IOServer(httpserver);

io.on("connection", async (socket) => {
  console.log("User Connected");
  let messages = await mensajesDao.getAll();
  
  socket.on("add-message", async (msg) => {
    console.log("mensaje enviado");
    await mensajesDao.save(msg);
    messages = await mensajesDao.getAll();
    io.sockets.emit("message-server", messages);
  });

  socket.emit("message-server", messages);
});

const PORT = process.env.PORT;

httpserver.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
  });  






