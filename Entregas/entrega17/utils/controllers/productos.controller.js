const {logger} = require('../../logger.js');
const {passport} = require('../passport/passport.js');
const prod = require("../content/productosFaker.js");


const getProducts =  async (req, res) => {
    logger.info("/productos-test GET")
    let user = req.session.user
    res.render("index",{ root: __dirname, user});
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

  module.exports = {getProducts, getLogin, logout, getSignup, errorSignup, login, signup}