const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt');

const express = require('express');

const app = express();

const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

server.on("error", (err) => {console.log(err)});

app.get('/productos', (req, res) => {
    let prod = contenedor.getAll();
    prod.then(val => res.send(val));
})

app.get('/productosRandom', (req, res) => {
    let numero = contenedor.getLength();
    console.log("num:", numero)
    numero = 3
    let random = Math.ceil(Math.random() * numero)
    let prod = contenedor.getById(random);
    prod.then(val => res.send(val));    
})
