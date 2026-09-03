const express = require ('express');
const app = express();
app.use(express.json());

// morgan is an http req logger middleware
const morgan = require ('morgan');

//loads env variables from .env file into app's env runtime
require("dotenv").config();

const httpStatusText = require ('./utils/httpStatusText');

// connent with db
const dbConnection =require('./config/database');
dbConnection();

// parse req string to js object
app.use(express.json());

// handle routes
// 1- category routes
const categoryRoutes = require('./routes/categories.routes');
app.use("/api/categories", categoryRoutes);




if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV }`);
}

app.get('/' , (req,res)=>{
    res.send('Our API');
})


//global error handler
app.use((error , req, res, next)=>{
    res.status(error.statusCode ||500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode ||500,
        data: null
    });
});

const PORT = process.env.PORT || 8000;
app.listen (PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})