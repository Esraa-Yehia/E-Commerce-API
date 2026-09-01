const mongoose = require('mongoose');

const dbConnection =() =>{ 
   mongoose
   .connect(process.env.MONGO_URL)
   .then(()=>console.log('DB Connected Successfully'))
   .catch((err)=> {console.log('DB Error Connection',err);
    process.exit(1);
   });

};

module.exports = dbConnection;