const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();
const { Server: ServerHTTP } = require("http");
const { Server: IOServer } = require("socket.io");
const Firebase = require("./utils/ContenedorFirebase.js");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const ContenedorMongoDB = require('./utils/ContenedorMongoDB');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const parseArgs = require('minimist');
const {fork} = require('child_process')

const mensajes = new Firebase("mensajeria");
const usuarios = new ContenedorMongoDB('users');
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


const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next()
  }else{
      res.redirect('/productos-test/login')
  }
  

}

passport.use('login', new LocalStrategy({usernameField:'user', passwordField:'password'},
  async ( user, password, done )=> {
      let usuario = await usuarios.getByUser(user)
      console.log(usuario)
      if (!usuario) {
          console.log(`No existe el usuario ${user}`)
          return done(null, false, { message: 'User not found' })
      }
          
      if (!isValidPassword(usuario, password)) {
          console.log('Password incorrecto')
          return done(null, false, { message: 'Password incorrect' })
      }
      return done(null, usuario.user)
  }
))



passport.use('signup', new LocalStrategy({usernameField:'user', passwordField:'password',passReqToCallback:true},
 async (req, user, password, done) => {
  
  let usuario = await usuarios.getByUser(user)
  const { name, email } = req.body

  if (usuario) {
      console.log(`El usuario ${user} ya existe`)
      return done(null, false, { message: 'User already exists' })
  }

  let newUser = {
      user,
      password: createHash(password),
      name,
      email
  }

 usuarios.save(newUser)
  return done(null, newUser)
}))

passport.serializeUser((user, done) => {
  done(null, user)
})


passport.deserializeUser((user, done) => {
  let usuario = usuarios.getByUser(user)
  done(null, usuario)
})

app.get("/productos-test", checkAuth, async (req, res) => {
  let user = req.session.user
  res.render("index",{ root: __dirname, user});
});

app.get("/productos-test/login", async (req, res) => {
  res.render("login", { root: __dirname });
});


app.get('/api/productos-test/logout', (req, res) => {
  let user = req.session.user
  req.logout((err) => {
    if (err) { return next(err) }
    res.render('logout',{user})
  })
})
app.get('/productos-test/signup',(req, res) => {
  res.render('signup')
})

app.get('/productos-test/errorSignUp',(req, res) => {
  res.render('errorSignUp')
})

app.post("/api/productos-test/login", passport.authenticate('login',{
  successRedirect: '/productos-test',
  failureRedirect: '/productos-test/errorlogin',
}))

app.post("/api/productos-test/signup", passport.authenticate('signup',{
  successRedirect: '/productos-test/login',
  failureRedirect: '/productos-test/errorSignUp',
}),() => console.log("1"))

app.get('/info',(req,res)=>{
  res.render('info')
})

app.get('/api/randoms', (req,res) => {
    let {cant} = req.query
    if (!cant){ cant= 100000000}

    random = fork('./api/calcRandom.js')
    random.send({"limite":cant})

    random.on('message', (cant) =>{
      res.send(cant)
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

args = parseArgs(process.argv.slice(2),{default:{port:8080}});

const PORT = args.port;
const server = httpserver.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});
