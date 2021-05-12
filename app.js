const express = require('express');
const app = express();
const exressLayouts = require('express-ejs-layouts');
app.use(express.static("public"))
app.use(express.static("images"))

app.use(exressLayouts);
var ContactUs = require("./models/contactUs");


app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.static("image"))

app.use('/gallery/', (req, res) => res.render('gallery'));
app.use('/events/', (req, res) => res.render('events'));
app.use('/covid_awarness/', (req, res) => res.render('covid'));
app.use('/signin/', (req, res) => res.render('signin'));
app.use('/success/', (req, res) => res.render('success'))


//Home
app.get("/", function (req, res) {
    res.render("home");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on PORT:` + PORT));