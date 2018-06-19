var express = require("express");
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render("Home");
});

app.get('/availablecars/:id', function(req,res){
    if(req.params.id == 'a2p')
    {
        res.render("availableCars");
    }
    else if(req.params.id == 'p2a')
    {
        res.render("AvailableCars");
    }
    // res.sendFile(path.join(__dirname, 'View', 'AvailableCars.html'));
    console.log(req.params.id);
})

app.get('/cardetails/:id', function(req,res){
    if(req.params.id == 'enjoy')
    {
        res.render("CarDetails");
    }
    else if(req.params.id == 'etios')
    {
        res.render("CarDetails");
    }
    else if(req.params.id == 'innova')
    {
        res.render("CarDetails");
    }
    // res.sendFile(path.join(__dirname, 'View', 'AvailableCars.html'));
    console.log(req.params.id);
})


app.use(express.static('Resources'));

app.listen(777);