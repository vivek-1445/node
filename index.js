const express = require('express');
const port = 3000;
const app = express();


app.all('/',function(req,res){
    //console.log(req.url);
    
});


app.listen(port,function(err){

    if(err){
        console.log('Srever not start');
        return;
    }
    console.log('Server is started on port',port);

});