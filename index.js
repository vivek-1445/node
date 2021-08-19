const express = require('express');
const path = require('path');
 
const port = 3000;
const app = express();
const db = require('./config/mongoose');
const contact = require('./models/contact');
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

app.post('/create-contact',function(req,res){
       
    //   contactList.push({
    //       name : req.body.name,
    //       mail : req.body.mail,
    //       phone : req.body.phone,
    //       password : req.body.password
    //   })
    //   return res.redirect('/view-data');

    contact.create({
        name : req.body.name,
        mail : req.body.mail,
        phone : req.body.phone,
        password : req.body.password
    },function(err,newContact){
            if(err){
                console.log("somthing went wrong!");
                return;
            }
            return res.redirect('/view-data');
    });
});

app.get('/view-data',function(req,res){
    // res.render('profile',{
    //     title : "profile",
    //     Data : contactList
    // });

    contact.find({},function(err,data){
        if(err){
            console.log("Somthing went wrong!")
        }
        res.render('profile',{
            title : "profile",
            Data : data
        });

    })
});
app.get('/delete-data',function(req,res){
    var id = req.query.id;
    //console.log(req.params.phone);
   // let contactIndex = contactList.findIndex(p => p.phone == req.query.id);
   // console.log(contactIndex);
   // if(contactIndex != -1)
   //  {
   //     console.log("test");
   //     contactList.splice(contactIndex, 1);
   //  }
   contact.findByIdAndDelete(id,function(err){
       if(err){
           console.log("somthing went wrong!");
       }
       return res.redirect('back');
   });
    
});
 
app.get('/update-data',function(req,res){
    var id = req.query.id;
    contact.findById(id,function(err,data){
        if(err){
            console.log("somthing went wrong!");
            return;
        }
        
        return res.render('update-form',{
            title : "update-form",
            Data : data
        })
    })

    app.post('/edit-contact',function(req,res){
        let id = req.body.data_id;
        contact.findByIdAndUpdate(id, {
            name : req.body.name,
            mail : req.body.mail,
            phone : req.body.phone,
            password : req.body.password
        },function(err,newdata){
            if(err){ 
                console.log("somthing went wrong!");
                 return;
            }

            return res.redirect('/view-data');
        });
    });
    
})

app.listen(port,function(err){

    if(err){
        console.log('Srever not start');
        return;
    }
    console.log('Server is started on port',port);

});