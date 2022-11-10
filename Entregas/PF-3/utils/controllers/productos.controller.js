const { response } = require('express');
const ProductoDaoMongoDB = require('../daos/ProductosDaoMongoDB');
const productosDao = new ProductoDaoMongoDB();
const administrador = true;
const {logger} = require('../../logger.js');

const getProducts = async (req, res) => {
    try {
    //let cart = sessionStorage.getItem("cart")
    const productos = await productosDao.getAll();
    res.render('productos', {productos, administrador});
    }
    catch(error) {
        logger.error('error', error);
    }
}

const addProduct = async (req, res) => {
    try {
        if (administrador) {
            const body = req.body;
            const newProd = await productosDao.save(body);
            res.send(newProd);
        } else {
            res.send({error : -1, descripcion: "ruta '/' método 'POST' no autorizada"});
        }
   
    } catch (error) {
        res.json({ error : 'Fallo' });
        logger.error({ error : 'Fallo' })
    }

}

const addProductPage = async (req, res) => {
    try {
        if (administrador) {
            res.render('carga');
        } else {
            res.send({error : -1, descripcion: "ruta '/carga' método 'GET' no autorizada"}); 
        }
        }
        catch(error) {
            logger.error(error);
        }
}

const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
    const productos = [await productosDao.getById(id)];
    res.render('productos', {productos,administrador});
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    logger.error({ error : 'producto no encontrado' });
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        if (administrador) {
            let update = await productosDao.getByIdAndUpdate(id,body);
        } else {
            res.send({error : -1, descripcion: "ruta '/' método 'PUT' no autorizada"}); 
        }
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    logger.error({ error : 'producto no encontrado' });
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
    if (administrador) {
        const prod = await productosDao.deleteById(id);
        res.json("Producto Eliminado");
    } else {
        res.send({error : -1, descripcion: "ruta '/' método 'DELETE' no autorizada"}); 
    }
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    logger.error({ error : 'producto no encontrado' });
    }

}
    const getData = async (req, res) => {
        const {id} = req.params;
        try {
        const productos = await productosDao.getById(id);
        return productos;
        }
        catch(error) {
        res.json({ error : 'producto no encontrado' });
        logger.error({ error : 'producto no encontrado' });
        }
    }

module.exports = {getProducts, addProduct, addProductPage, getProduct, updateProduct, deleteProduct, getData}