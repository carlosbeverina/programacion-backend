const { Router } = require('express')
const RouterProductos = Router();
const {checkAuth} = require('../passport/passport.js');
const {getProducts, getLogin, logout, getSignup, errorSignup, login, signup} = require('../controllers/productos.controller.js')

RouterProductos.get("/", checkAuth, getProducts);
  
RouterProductos.get("/login", getLogin);

RouterProductos.get('/logout', logout);

RouterProductos.get('/signup', getSignup)
  
RouterProductos.get('/errorSignUp',errorSignup)
  
RouterProductos.post("/login", login)
  
RouterProductos.post("/signup", signup)

module.exports = RouterProductos;