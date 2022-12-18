const Koa = require('koa');
const { koaBody } = require('koa-body');
const json = require('koa-json');
const render = require('koa-ejs');
const path = require('path');
const session = require('koa-session');
const dotenv = require('dotenv').config();
const parseArgs = require('minimist');
const cluster = require('cluster');
const MongoStore = require('connect-mongo');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const {passport, usuariosDao} = require('./utils/passport/passport.js');
const {IOsocket,io} = require('./utils/controllers/socket.controller')
const logger = require('./logger.js');
const RouterProductos = require('./utils/routes/productos.routes');


const app =  new Koa();
app.use(json());
app.use(koaBody());
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});
//app.use(express.static("public"));
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
  },app)
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

app.use(RouterProductos.routes()).use(RouterProductos.allowedMethods());


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





