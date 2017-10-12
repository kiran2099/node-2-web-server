const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} - ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log(error);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     // res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send(`It's a root page`);
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        msg: 'Welcome to website'
    });
});

app.get('/about', (req, res) => {
    // res.send({
    //     name: 'KiranKumar Bussa',
    //     likes: [
    //         'Cricket',
    //         'Volleyball',
    //         'Music'
    //     ]
    // });
    res.render('about.hbs', {
        pageTitle: 'About Page',
        msg: 'Welcome to website'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status: 'Unable to handle the request'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ${port}');
});