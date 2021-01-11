const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const validator = require('validator');

const viewsPath = path.join(__dirname, 'views');
const partialPath = path.join(__dirname, 'views/partials');


app.set('view engine','hbs');

app.use(express.static('public'));

app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Search Route "/"
app.get('/', function(req, res){
    res.render('search', {
        layout : 'layouts/index',
        title: 'Peliculas',
    });
});

// Result Route "/"
app.get('/results', function(req, res){
    let query = req.query.search;
    let url = 'https://www.omdbapi.com/?apikey=6c0d5126&s=' + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            let data = JSON.parse(body)
            res.render('results', {
                layout : 'layouts/index',
                title: 'Buscador Peliculas',
                movies: data,
            });
        }
    });
});

app.listen(3000, function(){
    console.log('Movie app started on port: 3000');
});
