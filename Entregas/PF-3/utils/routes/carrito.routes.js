const {createCart, deleteCart, getCart, addToCart, deleteFromCart, buildCart, sendOrder} = require('../controllers/carrito.controller.js');
const { Router } = require('express');
const routerCarrito = Router();
const {checkAuth} = require('../passport/passport.js');

routerCarrito.post('/',checkAuth, createCart);

routerCarrito.delete('/:id', checkAuth, deleteCart);

routerCarrito.get('/:id/productos',checkAuth, getCart);

routerCarrito.post('/:id/productos', addToCart);

routerCarrito.delete('/:id/productos/:id_prod',checkAuth, deleteFromCart);

routerCarrito.get('/:id',checkAuth, buildCart);

routerCarrito.get('order/:id',checkAuth, sendOrder);

module.exports = routerCarrito