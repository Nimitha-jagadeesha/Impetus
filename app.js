const express = require('express');
const app = express();
const exressLayouts = require('express-ejs-layouts');
app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.static("images"))
var bodyParser = require('body-parser')
// const mongoose = require('mongoose');

app.use(exressLayouts);
// var ContactUs = require("./models/contactUs");
// var db ="mongodb+srv://nimitha:nimitha@cluster0.kbbl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post('*', urlencodedParser, function (req, res) {
//     var item ={
//         email:req.body.email,
//         message: req.body.message
//       }  
//       ContactUs.create(item, (err) =>{
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("success");
//         }
//     })
// })
app.use('/gallery/', (req, res) => res.render('gallery'));
app.use('/events/', (req, res) => res.render('events'));
app.use('/covid_awarness/', (req, res) => res.render('covid'));
app.use('/signin/', (req, res) => res.render('signin'));
app.use('/success/',(req,res)=>res.render('success'))


//Home
app.get("/", function (req, res) {
    res.render("home");
});
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on PORT:` + PORT));