const express = require('express')

const session = require('express-session')

const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')
// const ejs = require('ejs')

let Users = [
    { id: 1, username: 'admin', password: 'admin' },
]


const app = express()

// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


///////////////////////////////////////////////

app.use(session({
    secret: 'secret',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7

    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())



/////////// utils /////////

const isValidePassword = (user, password) => {
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
////////// PASSPORT  midelware //////////

passport.use('login', new LocalStrategy(
    ( username, password, done )=>{
        let user = Users.find( user => user.username === username )

        if (!user) {
            console.log(`No existe el usuario ${username}`)
            return done(null, false, { message: 'User not found' })
        }
            
        // if (!isValidePassword(user, password)) {
        //     console.log('Password incorrecto')
        //     return done(null, false, { message: 'Password incorrect' })
        // }

        if (user.password !== password) {
            console.log('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }           
        


        done(null, user)
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    let user = Users.find( user => user.username === username )
    const { name, email } = req.body

    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    let newUser = {
        id: Users.length + 1,
        username,
        // password: createHash(password),
        password,
        name,
        email
    }

    Users.push(newUser)

    return done(null, newUser.id)

}))
//////////////////   passport serialize   ///////

passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    let user = Users.find( user => user.id === id )

    done(null, user)
})

/////////////////////////////////////////////////

// index
app.get('/', (req, res) => {
    res.send('hola mundo')
})
app.get('/home', checkAuth,(req, res) => {
    res.render('profileUser',{user: req.user})
})

// login

app.get('/login', (req, res) => {

    // if (req.isAuthenticated()) {
    //     const { user } = req.user
    //     console.log('user logueado')
    //     res.render('profileUser')        
    // } else {
    //     console.log('user no logueado')
    //     res.render('login')
    // }
    res.render('login')
})


app.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/login',
}),(req, res) => {
    const { username, password } = req.body
    // const {user} = req.user


    res.render('profileUser')   

})

// signup

app.get('/signup', (req, res) => {
    res.render('signup')
})

// logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})
// fail route

// listen on port 4000 sfd
const port = 4000
const server = app.listen(port, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
