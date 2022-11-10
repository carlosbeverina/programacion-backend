const { response } = require('express')
const CarritoDaoMongoDB = require('../daos/CarritoDaoMongoDB')
const carritoDao = new CarritoDaoMongoDB()
const {getProduct} = require('../controllers/productos.controller.js')
const fetch = require('node-fetch')

const {logger} = require('../../logger.js');
const { session } = require('passport');


const createCart = async (req, res = response) => {
    try {
    let id = await carritoDao.newCart();
    res.send({id});
    } catch (error) {
        logger.error('error', error);
    }
}

const deleteCart = async (req, res = response) => {
    const {id} = req.params;
    try {
        await carritoDao.deleteById(id);
        res.send({"msg":`El carrito con id: ${id} fue eliminado.`})
        } catch (error) {
            logger.error('error', error);
        }
}

const getCart = async (req, res = response) => {
    const {id} = req.params;
    try {
        let cart = await carritoDao.getById(id)
        res.send(cart.productos)
    } catch (error) {
        logger.error('error', error);
    }
}

const addToCart = async (req, res = response) => {
    const {id} = req.params;
    const body = req.body;
    try {
        let newProd = body.id_prod;
        let carts = await carritoDao.getById(id);
        carts.productos.push(newProd);
        let update = await carritoDao.getByIdAndUpdate(id,carts.productos)
        res.send({"msg": "Producto agregado."})
    } catch (error) {
        logger.error('error', error);
    }
}

const deleteFromCart = async (req, res = response) => {
    const {id,id_prod} = req.params;
    try {
        let cart = await carritoDao.getById(id);
        let filter = cart.productos.filter((c) => c.id !== Number(id_prod))
        await carritoDao.getByIdAndUpdate(id, filter);
        res.send({"msg": "Producto eliminado."})
    } catch (error) {
        logger.error('error', error);
    }
}

const buildCart = async (req, res = response) => {
    const {id} = req.params
    try{
        if(id){
        let cart = await carritoDao.getById(id)
        let productos = []
        cart.productos.forEach( async prod => {
           let url = `http://localhost:8080/productos/${prod}`
            let item = await fetch(url)
            productos.push(item)
        });
        console.log(productos)
        res.send(productos)
    } else {
        alert("No hay nada")
    }
    } catch (error) {
        logger.error('error', error);
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    addToCart,
    deleteFromCart,
    buildCart
}
