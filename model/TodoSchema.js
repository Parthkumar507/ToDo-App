const mongoose=require('mongoose')

//Here ,We are deciding the schema of our database 
//means what field will be in my dB

const ToDoSchema= new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        required:false
    }
})

const TodoDB=mongoose.model('TodoDB',ToDoSchema)
//This TodoDB in right argument is collection name in mongoDB database with ToDoSchema

module.exports=TodoDB

