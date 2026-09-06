const httpStatusText = require ('../utils/httpStatusText');

const globalErrorHandler = (error , req, res, next)=>{
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(error , res);
    }
    else {
        sendErrorProd(error , res);
    }
};

const sendErrorDev = (error , res)=>{
    res.status(error.statusCode ||500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode ||500,
        stack: error.stack,
        data: null
    });
};

const sendErrorProd = (error , res)=>{
    res.status(error.statusCode ||500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message
    });
};

module.exports = globalErrorHandler;