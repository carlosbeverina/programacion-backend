const express = require('express');
const {createCart, deleteCart, getCart, addToCart, deleteFromCart, buildCart, sendOrder} = require('../controllers/carrito.controller.js');
const { Router } = express;
const routerCarrito = Router();
const {checkAuth} = require('../passport/passport.js');

routerCarrito.post('/',checkAuth, createCart);

routerCarrito.delete('/', checkAuth, deleteCart);

routerCarrito.get('/:id/productos',checkAuth, getCart);

routerCarrito.post('/productos', addToCart);

routerCarrito.delete('/:id_prod',checkAuth, deleteFromCart);

routerCarrito.get('/',checkAuth, buildCart); 

routerCarrito.get('/order/',checkAuth, sendOrder);

routerCarrito.get('/test',checkAuth, (req, res) => { console.log(req.session.passport.user);}); 

module.exports = routerCarrito