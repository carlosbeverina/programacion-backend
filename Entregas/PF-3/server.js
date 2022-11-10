const dotenv = require('dotenv').config();
const express = require('express')
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const fileUpload = require('express-fileupload');
const parseArgs = require('minimist');
const cluster = require('cluster');

const routerCarrito = require('./utils/routes/carrito.routes.js');
const routerProductos = require('./utils/routes/product.routes.js');
const routerUsuarios = require('./utils/routes/usuarios.routes.js');

const { logger } = require('./logger');

const app = express();

const administrador = true;

const {passport, usuarios} = require('./utils/passport/passport.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/static', express.static(__dirname + 'public'));
app.use(fileUpload());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      rolling: true, 
      cookie: { httpOnly: true,
              secure: false,
              maxAge: 360000},
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: advancedOptions,
      }),
    })
  );

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((email, done) => {
    done(null, email)
  })
  
passport.deserializeUser((email, done) => {
    let usuario = usuarios.getByUser(email)
    done(null, usuario)
  })

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);
app.use('/', routerUsuarios);
app.get('*', (req,res) => {
    logger.error(`${req.path} - ${req.method} Ruta no Implementada`)
    res.send({ "error" : -2, "descripcion": `ruta ${req.path} método ${req.method} no implementada`})
})

PORT = process.env.PORT || 8080;
args = parseArgs(process.argv.slice(2),{default:{port:8080}});

const modoCluster = (args._[0] === 'CLUSTER')

if (modoCluster && cluster.isPrimary) {
  console.log(`Pid - Master ${process.pid}`);
  for (let i = 0; i < require('os').cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    logger.info('Worker',worker.process.pid, 'died', new Date().toLocaleString)
    cluster.fork()
  })
} else {
  app.listen(PORT, () => {
    logger.info(`Escuchando el puerto ${PORT}`);
  });  
}