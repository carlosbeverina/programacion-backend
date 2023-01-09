const { Router } = require('express')
const RouterProductos = Router();
const {checkAuth} = require('../passport/passport.js');
const {getProducts, getProduct, addProduct, getIDs, modProduct,removeProduct,getData, getByCat} = require('../controllers/productos.controller.js')

RouterProductos.get("/", getProducts);

RouterProductos.get("/ids", getIDs);

RouterProductos.get("/cat/:cat", getByCat);

RouterProductos.get("/:id", getProduct);

RouterProductos.delete("/:id", removeProduct);

RouterProductos.post("/", addProduct);

RouterProductos.put("/:id", modProduct);

RouterProductos.get('/data/:id', getData);
  
module.exports = RouterProductos;