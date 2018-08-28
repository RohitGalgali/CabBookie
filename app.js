const express = require("express");
const app = express();
const sha512 = require("js-sha512");
const carModel = require("./Model/CarModel");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const request = require('request');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BookingEntries');
app.set('view engine', 'ejs');

var header = 'fblhmYVnPpKm+Ng7Nz30WpckWGGmVLZDe/j6sNawbbo='; //will be provided by payumoney

app.get('/', function (req, res) {
    res.render("Home");
});

app.get('/index', function (req, res) {
    res.render("Home");
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/services", (req, res) => {
    res.render("services");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get('/availablecars/:id', function (req, res) {
    if (req.params.id == 'a2p') {
        res.render("AvailableCars", {direction: 'a2p'});
    }
    else if (req.params.id == 'p2a') {
        res.render("AvailableCars", {direction: 'p2a'});
    }
    //res.sendFile(path.resolve(__dirname,"views/AvailableCars.html"));
    console.log(req.params.id);
})

app.get('/cardetails/:id', function (req, res) {
    if (req.params.id == 'enjoy') {
        res.render("CarDetails", { name: carModel.carName, seatArray: carModel.getAvailableSeats });
    }
    else if (req.params.id == 'etios') {
        res.render("CarDetails", { name: carModel.carName, seatArray: carModel.getAvailableSeats });
    }
    else if (req.params.id == 'innova') {
        res.render("CarDetails", { name: carModel.carName, seatArray: carModel.getAvailableSeats });
    }
    // res.sendFile(path.join(__dirname, 'View', 'AvailableCars.html'));
    console.log(req.params.id);
})

app.get('/BookingDetails/:id', function (req, res) {
    res.render("BookingDetails", { seatNumber: req.params.id, });
})


app.post("/SuccessPage", urlencodedParser, function (req, res) {
    console.log(req.body);
    res.render("SuccessPage", {
        txnId: req.body.txnid, productInfo: req.body.productinfo,
        amount: req.body.amount, firstName: req.body.firstname, lastName: req.body.lastname
    });
})

app.post("/FailurePage", urlencodedParser, function (req, res) {
    console.log(req.body);
    res.render("SuccessPage", {
        txnId: req.body.txnid, productInfo: req.body.productinfo,
        amount: req.body.amount, firstName: req.body.firstname, lastName: req.body.lastname
    });
})

app.post('/carDetails', urlencodedParser, function(req, res){
    
    
})

app.post('/InnovaBooking', urlencodedParser, function(req, res){
    console.log('Innova');
    console.log(req.body.date);
    console.log(req.body.direction);
})

app.post('/EtiosBooking', urlencodedParser, function(req, res){
    console.log('Etios');
    console.log(req.body.date);
    console.log(req.body.direction);
})

app.post('/EnjoyBooking', urlencodedParser, function(req, res){
    console.log('Enjoy');
    console.log(req.body.date);
    console.log(req.body.direction);
})


app.post('/payMoney', urlencodedParser, function (req, res) {
    var salt = 'DiaeHToBX8';
    var hashString = '';
    hashString += "BJZPBL6X|";
    hashString += req.body.txnid + "|";
    hashString += req.body.amount + "|";
    hashString += req.body.productinfo + "|";
    hashString += req.body.firstname + "|";
    hashString += req.body.email + "|";
    hashString += "||||||||||"
    hashString += salt;

    console.log(hashString);

    var hash = sha512(hashString);
    console.log(hash);

    //res.send(req.body);
    var payuData = {
        key: 'BJZPBL6X',
        salt: salt,
        service_provider: 'payu_paisa',
        hash: hash
    };

    var paymentData = {
        productinfo: req.body.productinfo,
        txnid: req.body.txnid,
        amount: req.body.amount,
        email: req.body.email,
        phone: req.body.phone,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        surl: "http://localhost:777/SuccessPage", //"http://localhost:3000/payu/success"
        furl: "http://localhost:777/FailurePage", //"http://localhost:3000/payu/fail"
    };

    var params = Object.assign(payuData, paymentData);

    request.post("https://sandboxsecure.payu.in/_payment", { form: params, headers: header }, function (error, response) {
        if (!error) {
            res.redirect(response.headers.location);
        }
    });
});

app.use(express.static('Resources'));
//app.use('/required', express.static('required'));
app.listen(777);