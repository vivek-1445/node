const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const port = 3000;
const app = express();
app.use(express.urlencoded());
app.use(express.static('assets'));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/',function(req,res){
     res.render('index',{
        title : "index",
     });
});

app.get('/profile',function(req,res){
    res.render('profile',{
        title : "profile",
    });
});

var contactList = [
    {
        name : "harsh",
        mail : "harsh@gmail.com",
        password : 9393939393
    },
    {
        name : "qwe",
        mail : "qwe@gmail.com",
        password : 9393939393
    },
    {
        name : "Vijay",
        mail : "Vijay@gmail.com",
        password : 9393939393
    }
]

app.get('/view-data',function(req,res){
    res.render('profile',{
        title : "profile",
        Data : contactList
    });
});

app.post('/create-contact',function(req,res){
       
      contactList.push({
          name : req.body.name,
          mail : req.body.mail,
          password : req.body.psw
      })
      return res.redirect('/view-data');
});


app.listen(port,function(err){

    if(err){
        console.log('Srever not start');
        return;
    }
    console.log('Server is started on port',port);

});