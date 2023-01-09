const {logger} = require('../../logger.js');
const {productosDao} = require('../daos/index.js')
const administrador = true

const getProducts =  async (req, res) => {
  try {
  const productos = await productosDao.getAll();
  let user = req.session.passport.user
  res.render('productos', {productos, administrador, user});
  }
  catch(error) {
      logger.error('error', error);
  }
}
  const getByCat = async (req, res) => {
    const {cat} = req.params
    const productos = await productosDao.getByCategory(cat)
    res.render('productos', {productos, administrador});
  }

  const removeProduct =  async (req, res) => {
    logger.info("/productos-test GET")
    const {id} = req.params
    await productosDao.deleteById(id)
    res.send({"msg":"Producto eliminado"});
  }

const getProduct =  async (req, res) => {
    try {
      logger.info("/productos-test GET")
      const {id} = req.params
      let producto = await productosDao.getById(id)
      res.send({...producto._doc});
      
    } catch (error) {
      res.send({msg:"Producto no Encontrado"});
    }
  }

const addProduct = async (req, res) => {
    logger.info("/productos-test/add POST")
    let save = await productosDao.save(req.body)
    res.send({...save[0]});
  }
const modProduct = async (req, res) => {
    const {id} = req.params
    logger.info("/productos-test/add PUT")
    await productosDao.getByIdAndUpdate(id,req.body)
    res.send({"msg":"Producto Modificado"});
  }

const getIDs = async (req,res) =>{
  let prods = await productosDao.getAll()
  res.send(prods[0]._id)
}

const getData = async (req, res) => {
  const {id} = req.params;
  try {
  const productos = await productosDao.getById(id);
  res.send(productos);
  }
  catch(error) {
  res.json({ error : 'producto no encontrado' });
  logger.error({ error : 'producto no encontrado' });
  }
}

  module.exports = {getProducts, getProduct, addProduct, getIDs, modProduct, removeProduct, getData, getByCat}