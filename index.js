const express = require('express');
const app = express();
const exressLayouts = require('express-ejs-layouts');
const path = require('path');
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'images')))
app.set("view engine", "ejs");
let alert = require('alert');

app.use(express.static("public"))
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

app.use(exressLayouts);
var ContactUs = require("./models/ContactUs");
var db = "mongodb+srv://nimitha:nimitha@cluster0.kbbl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('*', urlencodedParser, function (req, res) {
    var item = {
        email: req.body.email,
        message: req.body.message
    }
    ContactUs.create(item, (err) => {
        if (err) {
            console.log(err);
        } else {
            alert("Submitted Sucessfully")
            res.render('home');
        }
    })
})
app.use('/gallery/', (req, res) => res.render('gallery'));
app.use('/events/', (req, res) => res.render('events'));
app.use('/covid_awareness/', (req, res) => res.render('covid'));
app.use('/signin/', (req, res) => res.render('signin'));
app.use('/retrogaming/', (req, res) => res.render('retrogaming'));
app.use('/schedule/', (req, res) => res.render('schedule'));

app.use('/eventbrochure/', (req, res) => res.render('events_Brochure'));
app.use('/success/', (req, res) => res.render('success'));
app.get("/admin/impetus21/allmessages/adminpanel", function (req, res) {
    let data=[];
    ContactUs.find({}).then(function (storedDataArray) {
       data = storedDataArray
       res.render('list',{users:data})
    }).catch(function(err){
        if (err) {
            throw new Error(err.message);
        }
    });
    // res.render('list',{users:data})
});

//Home
app.get("/", function (req, res) {
    res.render("home");
});
app.all('*', (req, res, next) => {
    next(new Error('Page Not Found', 404))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on PORT:` + PORT));
