const DAOmensajeriaFirebase = require('../daos/DAO.mensajeria.Firebase.js');
const { Server: ServerHTTP } = require("http");
const express = require('express')
const app = express()
const { Server: IOServer } = require("socket.io");
const { builtinModules } = require('module');
const httpserver = new ServerHTTP(app);
const io = new IOServer(httpserver);
const mensajes = new DAOmensajeriaFirebase()

const IOsocket = async (socket) => {
    console.log("User Connected");
    let productos = prod;
    let messages = await mensajes.getAll();
    let comp = await mensajes.getCompRate();
  
    data = {
      messages,
      productos,
      comp
    };
  
    socket.on("add-product", async (product) => {
      await contenedor.save(product);
      data.productos = await contenedor.getAll();
      io.sockets.emit("message-server", data);
    });
  
    socket.on("add-message", async (msg) => {
      await mensajes.save(msg);
      data.messages = await mensajes.getAll();
      io.sockets.emit("message-server", data);
    });
  
    socket.emit("message-server", data);
  }

module.exports = {IOsocket,io}