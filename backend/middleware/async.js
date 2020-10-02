module.exports = function (handler){ // handles try and catch so I won't have to write try and catch everywhere.
    return async (req,res ,next) =>{
        try{
            await handler(req,res);
        }
        catch(ex)
        {
            next(ex);
        }
    }       
}
