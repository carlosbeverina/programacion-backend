const Router = require('@koa/router');
const RouterProductos = new Router();
const {checkAuth} = require('../passport/passport.js');
const {getProducts, getProduct, addProduct, getIDs, modProduct,removeProduct,getLogin, logout, getSignup, errorSignup, login, signup} = require('../controllers/productos.controller.js')
const {getInfo} = require('../controllers/api.controller.js')

RouterProductos.prefix('/productos-test')

RouterProductos.get('/info',getInfo)
  
RouterProductos.get("/", getProducts);

RouterProductos.get("/ids", getIDs);

RouterProductos.get("/crud/:id", getProduct);

RouterProductos.delete("/crud/:id", removeProduct);

RouterProductos.post("/crud", addProduct);

RouterProductos.put("/crud/:id", modProduct);
  
RouterProductos.get("/login", getLogin);

RouterProductos.get('/logout', logout);

RouterProductos.get('/signup', getSignup)
  
RouterProductos.get('/errorSignUp',errorSignup)
  
RouterProductos.post("/login", login)
  
RouterProductos.post("/signup", signup)

module.exports = RouterProductos;