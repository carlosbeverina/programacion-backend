const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();
const parseArgs = require('minimist');
const cluster = require('cluster');
const MongoStore = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const {passport, usuariosDao} = require('./utils/passport/passport.js');
const RouterProductos = require('./utils/routes/productos.routes')
const RouterApi = require('./utils/routes/api.routes');
const {IOsocket,io} = require('./utils/controllers/socket.controller')
const logger = require('./logger.js');
const { GraphQlController } = require("./graphQl/controller/graphQl.controller.js");


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
            maxAge: 36000},
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

app.use('/productos-test',RouterProductos);
app.use('/api',RouterApi);
app.use('/gql', new GraphQlController())

// app.all('*', (req,res)=>{
//   logger.warn(`${req.path} - ${req.method}`)
//   res.send("<h1>Error 404</h1>")
// })

io.on("connection", IOsocket);

args = parseArgs(process.argv.slice(2),{default:{port:8080}});

const PORT = process.env.PORT;
const modoCluster = (args._[0] === 'CLUSTER')

if (modoCluster && cluster.isPrimary) {
  console.log(`Pid - Master ${process.pid}`);
  for (let i = 0; i < require('os').cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    console.log('Worker',worker.process.pid, 'died', new Date().toLocaleString)
    cluster.fork()
  })
} else {
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
  });  
}





