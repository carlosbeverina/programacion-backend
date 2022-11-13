const { request,response } = require('express')
const CarritoDaoMongoDB = require('../daos/CarritoDaoMongoDB')
const carritoDao = new CarritoDaoMongoDB()
const {getProduct} = require('../controllers/productos.controller.js')
const fetch = require('node-fetch')
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const {logger} = require('../../logger.js');
const { usuarios } = require('../passport/passport.js');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
  }
});


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
        let url = `http://localhost:8080/productos/data/${body.id_prod}`
        let item = await fetch(url)
        let newProd = await item.json();
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
        let cart = await carritoDao.getById(id)
        let productos = cart.productos
        if (id || productos.length >0){

            res.render('cart',{productos,id})
    } else {
        alert("No hay nada")
    }
    } catch (error) {
        logger.error('error', error);
    }
}

const sendOrder = async (req = request, res = response) => {
    const {id} = req.params
    let email = req.session.passport.user
    let user = await usuarios.getByUser(email)
    let cart = await carritoDao.getById(id)
    const mailOptions =  {
        from: 'Servidor Ecommerce',
        to: process.env.MAIL_USER,
        subject: `Nuevo pedido de ${user.name} - ${user.email}`,
        html: `Lista de productos:
        ${cart.productos}
        `
      }
    const info = await transporter.sendMail(mailOptions)
    
    try {
        const message1 = await client.messages.create({
            from:'+15627845598',
            to: '+543814772514',
            body: `Nuevo pedido de ${user.name} - ${user.email} Lista de productos:
            ${cart.productos}
            `
        })
        let dest = `${user.phone}`
        const message2 = await client.messages.create({
            from:'+15627845598',
            to: dest,
            body: `Muchas gracias por su pedido. El mismo fue recibido y esta siendo procesado.`
        })

        logger.info(message1)
        logger.info(message2)
    } catch (error) {
        logger.error('error', error);
    }
    res.send("Su pedido fue recibido ")
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    addToCart,
    deleteFromCart,
    buildCart,
    sendOrder
}
