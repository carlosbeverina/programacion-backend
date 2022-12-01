const { Router } = require('express')
const RouterProductos = Router();
const {checkAuth} = require('../passport/passport.js');
const {getProducts, getProduct, addProduct, getIDs, modProduct,removeProduct,getLogin, logout, getSignup, errorSignup, login, signup} = require('../controllers/productos.controller.js')

RouterProductos.get("/", getProducts);

RouterProductos.get("/ids", getIDs);

RouterProductos.get("/:id", getProduct);

RouterProductos.delete("/:id", removeProduct);

RouterProductos.post("/add", addProduct);

RouterProductos.put("/add/:id", modProduct);
  
RouterProductos.get("/login", getLogin);

RouterProductos.get('/logout', logout);

RouterProductos.get('/signup', getSignup)
  
RouterProductos.get('/errorSignUp',errorSignup)
  
RouterProductos.post("/login", login)
  
RouterProductos.post("/signup", signup)

module.exports = RouterProductos;