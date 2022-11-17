const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {logger} = require('../../logger');
const DAOusuariosMongo = require('../daos/DAO.usuarios.mongo.js');
const usuarios = new DAOusuariosMongo()

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
  }
  
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  }
  
const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }else{
        res.redirect('/productos-test/login')
    }
  }
  
  passport.use('login', new LocalStrategy({usernameField:'user', passwordField:'password'},
    async ( user, password, done )=> {
        let usuario = await usuarios.getByUser(user)
        if (!usuario) {
          logger.error(`No existe el usuario ${user}`)
            return done(null, false, { message: 'User not found' })
        }
            
        if (!isValidPassword(usuario, password)) {
          logger.error('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }
        return done(null, usuario.user)
    }
  ))
  
  passport.use('signup', new LocalStrategy({usernameField:'user', passwordField:'password',passReqToCallback:true},
   async (req, user, password, done) => {
    
    let usuario = await usuarios.getByUser(user)
    const { name, email } = req.body
  
    if (usuario) {
      logger.error(`El usuario ${user} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }
  
    let newUser = {
        user,
        password: createHash(password),
        name,
        email
    }
  
   usuarios.save(newUser)
    return done(null, newUser)
  }));


  module.exports = {passport, checkAuth, usuarios}