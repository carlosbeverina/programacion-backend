const {logger} = require('../../logger.js');
const {fork} = require('child_process')


const getInfo = (req,res)=>{
    logger.info("/info GET")
    res.render('info')
  }


const getRandoms = (req,res) => {
    logger.info("/api/randoms GET")
      let {cant} = req.query
      if (!cant){ cant= 100000000}
  
      random = fork('../content/calcRandom.js')
      random.send({"limite":cant})
  
      random.on('message', (cant) =>{
        res.send(cant)
      })
      
  }

module.exports = {getRandoms, getInfo}