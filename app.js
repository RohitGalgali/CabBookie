var express = require("express");
var app = express();
var sha512 = require("js-sha512");
const carModel = require("./Model/CarModel");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render("Home");
});

app.get('/availablecars/:id', function(req,res){
    if(req.params.id == 'a2p')
    {
        res.render("AvailableCars");
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
        res.render("CarDetails", {name: carModel.carName, seatArray: carModel.getAvailableSeats});
    }
    else if(req.params.id == 'etios')
    {
        res.render("CarDetails", {name: carModel.carName, seatArray: carModel.getAvailableSeats});
    }
    else if(req.params.id == 'innova')
    {
        res.render("CarDetails", {name: carModel.carName, seatArray: carModel.getAvailableSeats});
    }
    // res.sendFile(path.join(__dirname, 'View', 'AvailableCars.html'));
    console.log(req.params.id);
})

app.get('/BookingDetails/:id',function(req,res){
    res.render("BookingDetails",{seatNumber: req.params.id, });
})

app.post('/payMoney', urlencodedParser, function (req, res) {
    var salt = 'DiaeHToBX8';
    var hashString = '';
    hashString += "BJZPBL6X|";
    hashString += req.body.txnid + "|";
    hashString += req.body.amount + "|";
    hashString += req.body.firstname + "|";
    hashString += req.body.email + "|";
    hashString += "||||||||||"
    hashString += salt;
    console.log(hashString);
    //console.log(req.body);
    // var salt = 'DiaeHToBX8';
    var hash = sha512(hashString);
    console.log(hash);
    // res.send({success : true}); 
    // , hash: hash
    res.send(req.body);
});

app.use(express.static('Resources'));

app.listen(777);