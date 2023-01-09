const { request,response } = require('express')
const CarritoDaoMongoDB = require('../daos/DAO.carrito.mongo')
const carritoDao = new CarritoDaoMongoDB()
const OrdenesDaoMongoDB = require('../daos/DAO.ordenes.mongo')
const ordenesDao = new OrdenesDaoMongoDB()
const {getProduct} = require('../controllers/productos.controller.js')
const fetch = require('node-fetch')

const {logger} = require('../../logger.js');
const { usuariosDao } = require('../passport/passport.js');

const transporter = require('../mailer/mailer')


const createCart = async (req, res = response) => {
    try {
        console.log(req)
    //let id = await carritoDao.newCart();
    let id=1
    res.send({id});
    } catch (error) {
        logger.error('error', error);
    }
}

const deleteCart = async (req, res = response) => {
    const {id} = req.params;
    try {
        await carritoDao.deleteById(id);
        res.redirect('/carrito')
        res.send({"msg":`El carrito con id: ${id} fue eliminado.`})
        } catch (error) {
            logger.error('error', error);
        }
}

const getCart = async (req, res = response) => {
    let correo = req.session.passport.user
    try {
        let cart = await carritoDao.getCartByEmail(correo)
        res.send(cart.productos)
    } catch (error) {
        logger.error('error', error);
    }
}

const addToCart = async (req, res = response) => {
    let correo = req.session.passport.user
    const body = req.body;
    if (!correo){
        res.redirect('/')
    }
    try {
        let url = `http://localhost:8080/productos/data/${body.id_prod}`
        let item = await fetch(url)
        let newProd = await item.json();
        let carts = await carritoDao.getCartByEmail(correo);
        if (!carts){
            await carritoDao.newCart(correo)
            carts = await carritoDao.getCartByEmail(correo);
        }
        let flag = 0
        carts.productos.forEach(prod => {
            if(prod._id == body.id_prod){
                flag = 1
                prod.qty += 1
                prod.datetime = new Date()
            }
        });
        if(flag == 0){
            carts.productos.push({...newProd,"qty":1, "datetime": new Date()});
        }
        let update = await carritoDao.getByEmailAndUpdate(correo,carts.productos)
        res.send({"msg": "Producto agregado."})
    } catch (error) {
        console.log('error', error);
    }
}

const deleteFromCart = async (req, res = response) => {
    const {id_prod} = req.params;
    let correo = req.session.passport.user
    try {
        let cart = await carritoDao.getCartByEmail(correo);
        let filter = cart.productos.filter((prod) => prod._id !== id_prod)
        await carritoDao.getByEmailAndUpdate(correo, filter);
        res.send({"msg": "Producto eliminado."})
    } catch (error) {
        logger.error('error', error);
    }
}

const buildCart = async (req, res = response) => {
    let correo = req.session.passport.user
    try{
        let cart = await carritoDao.getCartByEmail(correo)
        if (correo && cart){
            let productos = cart.productos
            res.render('carrito',{productos})
    } else {
        let productos = false
        res.render('carrito',{productos})
    }
    } catch (error) {
        logger.error('error', error);
    }

}

const sendOrder = async (req = request, res = response) => {
    let correo = req.session.passport.user
    let user = await usuariosDao.getByUser(correo)
    let cart = await carritoDao.getCartByEmail(correo)
    let order = await ordenesDao.newOrder(user,cart)
    let list = ""
    cart.productos.forEach(prod =>{
        list +=`
        <tr>
        <td width="350" style="border: 1px solid black ; text-align: center">${prod.title}</td>
        <td width="350" style="border: 1px solid black ; text-align: center">${prod.qty}</td>
        </tr>
        `
    })
    const mailOptions =  {
        from: 'Servidor Ecommerce',
        to: process.env.MAIL_USER,
        subject: `Nuevo pedido de ${user.name} - ${user.email}`,
        html: `Lista de productos:
        <table style="border: 1px solid black;">
        <thead>
            <th width="350" style="border: 1px solid black ;  text-align: center">Producto</th>
            <th width="350" style="border: 1px solid black ; text-align: center">Cantidad</th>
        </thead>
        <tbody>
        ${list}
        </tbody>
        </table>
        <br>
        Domicilio de entrega: ${user.address}
        <br>
        Numero de Orden: ${order.number}
        <br>
        Hora del Pedido: ${order.datetime}
        `
      }
    const info = await transporter.sendMail(mailOptions)
    await carritoDao.deleteById(cart._id);
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
