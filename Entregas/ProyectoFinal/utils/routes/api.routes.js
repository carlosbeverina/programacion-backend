const { Router } = require('express')
const RouterApi = Router();
const {getInfo, getLogin, logout, getSignup, errorSignup, login, signup, errorLogin, chat, chatUser} = require('../controllers/api.controller.js')


RouterApi.get('/info',getInfo)
  
RouterApi.get("/", getLogin);

RouterApi.get('/logout', logout);

RouterApi.get('/signup', getSignup)
  
RouterApi.get('/errorSignUp',errorSignup)

RouterApi.get('/errorLogin',errorLogin)
  
RouterApi.post("/login", login)
  
RouterApi.post("/signup", signup)

RouterApi.get("/chat", chat)

RouterApi.get("/chat/:user", chatUser)

module.exports = RouterApi