const express = require('express')
const bodyParser = require('body-parser');
const path =require('path')
const port=8000

//db is require , so connecting my main file and dB
const db=require('./config/mongoose')

const TodoDB=require('./model/TodoSchema');
const { MongoExpiredSessionError } = require('mongodb');

//for calling the express 
const app=express();

//for setting our view engine to ejs
app.set('view engine','ejs')

//As we know ejs is based on MVC ,
//so we set views path
//means if index.js ever require view go to viewFolder by joing them
app.set('views',path.join(__dirname,'viewFolder'))
//__dirname -> current directory name


//for a warning it is added , as something gets out of date
app.use(express.urlencoded({extended:true}))

//if app require static files , go to assests folder
app.use(express.static('assests'))


let colors = {
    Personal : 'darkgreen',
    Work : 'darkmagenta',
    Home : 'darkorange',
    Other : 'darkcyan',
    '' : 'rgb(34,193,195)',
}


app.get('/',function(req,res){
    TodoDB.find({},function(err,newToDos){
        if(err){
            console.log('Error in fetching the DB')
            return ;
        }
        return res.render('home',{
            TitleName:"My To-DO",
            ToDo_List:newToDos,
            color_list:colors
        })
    })
})
app.post('/create-ToDo',function(req,res){
    // console.log(req.body)
    TodoDB.create({
        desc:req.body.desc,
        category:req.body.category,
        date:req.body.UserDate

    },function(err,newToDos){
        if(err) {   console.log('error in adding todo to db');
    return ;
    }
        console.log('********',newToDos);
        return res.redirect('back')

    })

})

app.post('/delete-contact',function(req,res){
    if(req.body.id_check==undefined){
        console.log('User donot select any item')
        return res.redirect('back')
    }else if(typeof(req.body.id_check)=='string'){
        TodoDB.findByIdAndDelete(req.body.id_check,function(err){
            if(err){
                console.log('error in deleting the ToDo')
                return 
            }
        })
        
    }else{
        for(let i of req.body.id_check){
            TodoDB.findByIdAndDelete(i,function(err){
                if(err){
                    console.log('error in deleting the Multiple ToDo',i)
                    return 
                }
            })

        }
      return  res.redirect('back')   
    }


})


//for app launch
app.listen(port,function(err){
    if(err){
        console.log('Error occurced in launching the app on port :',port)
    return ;
    }
    console.log('Our app launhed successfully')
})
