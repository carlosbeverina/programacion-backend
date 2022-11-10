const express = require('express');
const {getProducts, addProduct, addProductPage, getProduct, updateProduct, deleteProduct,getData} = require('../controllers/productos.controller.js');
const { Router } = express;
const routerProductos = Router();
const {checkAuth} = require('../passport/passport.js');


routerProductos.get('/',checkAuth, getProducts);

routerProductos.post('/',checkAuth, addProduct)

routerProductos.get('/carga/', addProductPage)

routerProductos.get('/:id', getProduct);

routerProductos.get('/data/:id', getData);

routerProductos.put('/:id',checkAuth, updateProduct);

routerProductos.delete('/:id',checkAuth, deleteProduct);

module.exports = routerProductos;