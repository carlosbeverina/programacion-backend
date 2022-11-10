const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UsuariosDaoMongoDB = require('../daos/UsuariosDaoMongoDB.js');
const usuarios = new UsuariosDaoMongoDB();
const fileUpload = require('express-fileupload');
const rootDir = require('path').resolve('./');
const {logger} = require('../../logger.js');


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
        res.redirect('/login')
    }
  }

  passport.use('login', new LocalStrategy({usernameField:'email', passwordField:'password'},
  async ( email, password, done )=> {

      let usuario = await usuarios.getByUser(email)
      if (!usuario) {
        logger.error(`No existe el usuario ${email}`)
          return done(null, false, { message: 'User not found' })
      }
          
      if (!isValidPassword(usuario, password)) {
        logger.error('Password incorrecto')
          return done(null, false, { message: 'Password incorrect' })
      }
      return done(null, usuario.email)
  }
))

passport.use('signup', new LocalStrategy({usernameField:'email', passwordField:'password',passReqToCallback:true},
 async (req, email, password, done) => {
  let usuario = await usuarios.getByUser(email)

  if (usuario) {
    logger.error(`El usuario ${email} ya existe`)
      return done(null, false, { message: 'User already exists' })
  }
  const { photo } = req.files

  photo.mv(rootDir + '/public/photos/' + req.body.email + photo.name);
  let newUser = {
      email: req.body.email,
      password: createHash(req.body.password),
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      phone: req.body.phone,
      photo:`${__dirname + '\\public\\photos\\' + req.body.email + photo.name}`
  }

 usuarios.save(newUser)
  return done(null, newUser)
}))



module.exports = {passport, isValidPassword, createHash, checkAuth, usuarios}