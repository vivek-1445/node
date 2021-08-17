const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const port = 3000;
const app = express();
const db = require('./config/mongoose');
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
        phone :   1478523698,
        password : "QWERQ!@#"
    },
    {
        name : "qwe",
        mail : "qwe@gmail.com",
        phone  :   324234234234,
        password : "asdasd34sa#$"
    },
    {
        name : "Vijay",
        mail : "Vijay@gmail.com",
        phone :   234341212334,
        password : "sdaasd234"
    }
]

app.get('/view-data',function(req,res){
    res.render('profile',{
        title : "profile",
        Data : contactList
    });
});

app.get('/delete-data',function(req,res){
     //console.log(req.query.id);
     //console.log(req.params.phone);
    let contactIndex = contactList.findIndex(p => p.phone == req.query.id);
    console.log(contactIndex);
    if(contactIndex != -1)
     {
        console.log("test");
        contactList.splice(contactIndex, 1);
     }
     return res.redirect('back');
});

app.post('/create-contact',function(req,res){
       
      contactList.push({
          name : req.body.name,
          mail : req.body.mail,
          phone : req.body.phone,
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