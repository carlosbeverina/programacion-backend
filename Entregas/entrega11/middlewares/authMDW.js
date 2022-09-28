const express = require("express");
const session = require('express-session');

const auth = (req, res, next) => {
    if(req.session.user === 'carlos' && req.session.admin){
        return next();
    }
    return res.render("login", { root: __dirname })
}

module.exports = auth;