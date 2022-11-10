const { response } = require('express');
const {passport} = require('../passport/passport.js');

const showLogin = async (req, res = response) => {
    res.render("login", { root: __dirname });
  }

const logout = (req, res = response) => {
    let user = req.session.user
    req.logout((err) => {
      if (err) { return next(err) }
      res.render('logout',{user})
    })
  }

const showSignup = (req, res = response) => {
    res.render('signup')
  }

const errorSignUp = (req, res = response) => {
    res.render('errorSignUp')
  }

const errorLogin = (req, res = response) => {
    res.render('errorlogin')
  }

const login = passport.authenticate('login',{
    successRedirect: '/productos',
    failureRedirect: '/errorlogin',
  })

const signup = passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/errorSignUp',
  })

module.exports = {showLogin, logout, showSignup, errorSignUp, errorLogin, login, signup}