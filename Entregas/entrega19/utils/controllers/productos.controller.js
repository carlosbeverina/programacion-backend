const {logger} = require('../../logger.js');
const {passport} = require('../passport/passport.js');
const {productosDao} = require('../daos/index.js')
const prod = require("../content/productosFaker.js");
const productos = require('../content/productosFaker.js');


const getProducts =  async (req, res) => {
    logger.info("/productos-test GET")
    let user = req.session.user
    res.render("index",{ root: __dirname, user});
  }

  const removeProduct =  async (req, res) => {
    logger.info("/productos-test GET")
    const {id} = req.params
    await productosDao.deleteById(id)
    res.send({"msg":"Producto eliminado"});
  }

const getProduct =  async (req, res) => {
    logger.info("/productos-test GET")
    const {id} = req.params
    let producto = await productosDao.getById(id)
    res.send({...producto._doc});
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


const getLogin = async (req, res) => {
    logger.info("/productos-test/login GET")
    res.render("login", { root: __dirname });
  }

const logout = (req, res) => {
    logger.info("/productos-test/logout GET")
    let user = req.session.user
    req.logout((err) => {
      if (err) { return next(err) }
      res.render('logout',{user})
    })
  }

const getSignup = (req, res) => {
    logger.info("/productos-test/signup GET")
    res.render('signup')
  }

const errorSignup = (req, res) => {
    logger.info("/productos-test/errorSignUp GET")
    res.render('errorSignUp')
  }

const login = passport.authenticate('login',{
    successRedirect: '/productos-test',
    failureRedirect: '/productos-test/errorlogin',
  })

const signup = passport.authenticate('signup',{
    successRedirect: '/productos-test/login',
    failureRedirect: '/productos-test/errorSignUp',
  })

  module.exports = {getProducts, getProduct, addProduct, getIDs, modProduct, removeProduct,getLogin, logout, getSignup, errorSignup, login, signup}