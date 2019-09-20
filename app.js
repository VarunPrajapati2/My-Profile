var express = require('express');
var exphbs = require('express-handlebars');
var path =require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var nodeMailer = require('nodemailer');


var app=express();

const port=process.env.PORT || 8080

//set handlebars Engine
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//static file
app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


//set index page
app.get('/',(request,response)=>{
 response.render('index');
})

//render 404 page
// app.use(function (req, res, next) {
//     res.status(404).render("404page");
//   });


//NodeMailer Code

app.post('/send-mail',function(req,res){
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'vrunprajapati1996@gmail.com',
      pass: 'Varun@8899'
     }
   });

   // For Node Mailer We need to allow aceess your Google Account
   //  myaccount.google.com/lesssecureapps

let mailOptions = {
  from: '"Varun" <vrunprajapati1996@gmail.com>',
  to: req.body.to,  //list of receivers
  subject: req.body.subject,  //subject Line
  text: req.body.text,
  html: '<b>ThankYou</b>'
};

    transporter.sendMail(mailOptions, (error,info) => {
     if (error) {
       return console.log(error); 
     }
       console.log('Message is sent: %s',info.messeageId)
       res.render('index');
      //alert("Your FeedBack is successfully Sent");
   });

});

//serve this page on localhost 
app.listen(port,(req,res)=>{
  console.log('server is running on port  '+port)
});