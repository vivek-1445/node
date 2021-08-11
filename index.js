const express = require('express');
const path = require('path');
const port = 3000;
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/',function(req,res){
     res.render('index',{
         content : "this is index page content"
     });
});

app.get('/profile',function(req,res){
    res.render('profile',{
        content : "this is profile page content"
    });
});


app.listen(port,function(err){

    if(err){
        console.log('Srever not start');
        return;
    }
    console.log('Server is started on port',port);

});