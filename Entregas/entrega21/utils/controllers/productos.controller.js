const {logger} = require('../../logger.js');
const {passport} = require('../passport/passport.js');
const {productosDao} = require('../daos/index.js')
const prod = require("../content/productosFaker.js");
const productos = require('../content/productosFaker.js');


const getProducts =  async ctx => {
    logger.info("/productos-test GET")
    let user = ctx.session.user
    return ctx.render('index',{ root: __dirname, user});
  }

  const removeProduct =  async ctx => {
    logger.info("/productos-test GET")
    const {id} = ctx.query
    await productosDao.deleteById(id)
    ctx.body = {"msg":"Producto eliminado"};
  }

const getProduct =  async ctx => {
    logger.info("/productos-test GET")
    const {id} = ctx.request.params
    let producto = await productosDao.getById(id)
    ctx.body = {...producto._doc};
  }

const addProduct = async ctx => {
    logger.info("/productos-test/add POST")
    let save = await productosDao.save(req.body)
    ctx.body = {...save[0]};
  }
const modProduct = async ctx => {
    const {id} = req.params
    logger.info("/productos-test/add PUT")
    await productosDao.getByIdAndUpdate(id,req.body)
    ctx.body = {"msg":"Producto Modificado"};
  }

const getIDs = async ctx =>{
  let prods = await productosDao.getAll()
  ctx.body = prods[0]._id;
}


const getLogin = async ctx => {
    logger.info("/productos-test/login GET")
    return ctx.render("login", { root: __dirname });
  }

const logout = async (ctx,next) => {
    logger.info("/productos-test/logout GET")
    let user = req.session.user
    req.logout((err) => {
      if (err) { return next(err) }
      return ctx.render('logout',{user})
    })
  }

const getSignup = async ctx => {
    logger.info("/productos-test/signup GET")
    return ctx.render('signup')
  }

const errorSignup = async ctx => {
    logger.info("/productos-test/errorSignUp GET")
    return ctx.render('errorSignUp')
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