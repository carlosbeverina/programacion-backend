const {logger} = require('../../logger.js');
const {passport} = require('../passport/passport.js');


const getInfo = (req,res)=>{
    logger.info("/info GET")
    res.render('info')
  }

const getLogin = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/productos')
  } else{
    logger.info("/productos-test/login GET")
    res.render("login", { root: __dirname });
  }
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

const errorLogin = (req, res) => {
    logger.info("/productos-test/errorLogin GET")
    res.render('errorlogin')
  }

const login = passport.authenticate('login',{
    successRedirect: '/productos',
    failureRedirect: '/errorlogin',
  })

const signup = passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: '/errorSignUp',
  })

const chat = (req, res) => {
    logger.info("/productos-test/chat GET")
    res.render('chat')
  }
  
const chatUser = (req, res) => {
    const {user} = req.params
    logger.info("/productos-test/chat GET")
    res.render('chatUser', {user})
  }
module.exports = {getInfo, getLogin, logout, getSignup, errorSignup, login, signup, errorLogin, chat, chatUser}