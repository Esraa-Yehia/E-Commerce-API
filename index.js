const express = require ('express');
const app = express();
app.use(express.json());

// morgan is an http req logger middleware
const morgan = require ('morgan');

//loads env variables from .env file into app's env runtime
require("dotenv").config();

const globalErrorHandler = require ('./middlewares/globalErrorHandler');
const httpStatusText = require ('./utils/httpStatusText');
const appError = require ('./utils/appError');

// connent with db
const dbConnection =require('./config/database');
dbConnection();

// parse req string to js object
app.use(express.json());

// mount routes
const categoryRoutes = require('./routes/categories.routes');
app.use("/api/categories", categoryRoutes);

const subCategoryRoutes = require('./routes/subCategory.routes');
app.use("/api/subcategories", subCategoryRoutes);

const brandRoutes = require('./routes/brand.routes');
app.use("/api/brands", brandRoutes);

const productRoutes = require('./routes/product.routes');
app.use("/api/products", productRoutes);


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV }`);
}

app.get('/' , (req,res)=>{
    res.send('Our API');
})

// 404 middleware for unhandled routes
app.all('{/*all}',(req,res,next)=>{

 const err = appError.create(`Can't find this route ${req.originalUrl} on this server`, 404, httpStatusText.FAIL);

  next(err);
});


//global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen (PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
});

// handle errors outside express
process.on('unhandledRejection', (err)=>{
   
    console.log(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
        console.log('Shutting down...');
        process.exit(1);
    });
});