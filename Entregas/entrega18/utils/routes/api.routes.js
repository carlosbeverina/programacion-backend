const { Router } = require('express')
const RouterApi = Router();
const {getRandoms, getInfo} = require('../controllers/api.controller.js')


RouterApi.get('/info',getInfo)
  
RouterApi.get('/randoms', getRandoms)


module.exports = RouterApi