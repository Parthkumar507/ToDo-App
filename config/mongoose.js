
//req the library
const mongoose=require('mongoose')

//connection to databse
mongoose.connect('mongodb://localhost:27017/to-do-list_db') // with this name the database will form


// acquire the connection to check if it is successful
const db=mongoose.connection;

// //on error
db.on('error',console.error.bind(console,'error occured in connecting with the db'))

//on success
db.once('open',function(){
    console.log('Successfully connected to db')
})


