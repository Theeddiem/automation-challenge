module.exports = function(error,req,res, next){ // catches error
    res.status(400).send(error.message);
}
  
  