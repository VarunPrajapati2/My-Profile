var express = require('express');
var exphbs = require('express-handlebars');
var path =require('path');

var app=express();


//set handlebars Engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//static file

app.use(express.static(path.join(__dirname, 'public')));


//set index page
app.get('/',(request,response)=>{
 response.render('index');
})

//render 404 page
app.use(function (req, res, next) {
    res.status(404).render("404page");
  });

//serve this page on localhost 
app.listen('8080',()=>{
  console.log('server is running on port 8080');
});