const winston = require('winston');
const { transports } = require("winston");

const logger = winston.createLogger({
    level:'warn',
    transports:[
      new winston.transports.Console({level: 'verbose'}),
      new winston.transports.File({filename: 'warn.log', level:'warn'}),
      new winston.transports.File({filename: 'error.log', level:'error'})
    ]
  });

module.exports = {logger}