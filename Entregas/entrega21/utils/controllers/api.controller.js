const {logger} = require('../../logger.js');
const {fork} = require('child_process')


const getInfo = async ctx =>{
    logger.info("/info GET")
    return ctx.render('info')
  }

module.exports = {getInfo}