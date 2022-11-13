const express = require('express');
const { Router } = express;
const routerUsuarios = Router();
const {showLogin, logout, showSignup, errorSignUp, errorLogin, login, signup} = require('../controllers/usuarios.controller.js');


routerUsuarios.get("/login", showLogin);
   
routerUsuarios.get('/logout', logout )

routerUsuarios.get('/signup', showSignup)
  
routerUsuarios.get('/errorSignUp', errorSignUp)

routerUsuarios.get('/errorlogin', errorLogin)
  
routerUsuarios.post("/login", login)
  
routerUsuarios.post("/signup", signup)

module.exports = routerUsuarios