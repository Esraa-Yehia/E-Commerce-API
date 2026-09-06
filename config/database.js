const mongoose = require('mongoose');

const dbConnection =() =>{ 
   mongoose
   .connect(process.env.MONGO_URL)
   .then(()=>console.log('DB Connected Successfully'));

};

module.exports = dbConnection;