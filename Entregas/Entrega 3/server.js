const express = require('express');

const app = express();

const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

server.on("error", (err) => {console.log(err)});

