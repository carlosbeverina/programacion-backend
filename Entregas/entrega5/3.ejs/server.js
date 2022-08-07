const express = require('express')
const Contenedor = require('./contenedor');
const app = express();
const contenedor = new Contenedor('./productos.txt');


app.use(express.json());
app.use('/static', express.static(__dirname + 'public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views/pages');



app.get('/',async (req, res) =>{
    let productos = await contenedor.getAll()
    res.render('main');

});

app.get('/productos',async (req, res) =>{
    let productos = await contenedor.getAll();
    res.render('productos',{productos});
});

app.post('/productos',(req, res) =>{
    const {title, price, thumbnail} = req.body
    contenedor.save({title, price, thumbnail});
    res.redirect('/');
});


PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});



