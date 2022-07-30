const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt');

const express = require('express');

const app = express();

const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

server.on("error", (err) => {console.log(err)});

app.get('/productos', async (req, res) => {
    try {
    const prod = await contenedor.getAll();
    res.send(prod);
    }
    catch(error) {
        console.log('error', error);
    }
})

app.get('/productosRandom', async (req, res) => {
    try {
    let numero = await contenedor.getLength();
    let random = Math.ceil(Math.random() * numero)
    let prod = await contenedor.getById(random);
    res.send(prod);
    }
    catch(error) {
        console.log('error', error);
    }    
})
