const express = require("express");
const app = express();
const sha512 = require("js-sha512");
//const carModel = require("./Model/CarModel");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const request = require('request');
const path = require('path');
const carModel = require('./Model/CarModel');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CarEntries');

app.set('view engine', 'ejs');

var header = 'fblhmYVnPpKm+Ng7Nz30WpckWGGmVLZDe/j6sNawbbo='; //will be provided by payumoney

app.get('/', function (req, res) {
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
        res.render("AvailableCars", { direction: 'a2p' });
    }
    else if (req.params.id == 'p2a') {
        res.render("AvailableCars", { direction: 'p2a' });
    }
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

app.post('/InnovaBooking', urlencodedParser, function (req, res) {
    carModel.find({
        CarID: 'Innova',
        Date: req.body.date,
        DrivingDirection: req.body.direction

    }, {
            SeatNumber: 1
        }, (error, carEntries) => {
            if (error) {
                res.status(500).send({ error: "error in finding " })
            }
            else {
                //console.log(carEntries);
                res.render("CarDetails", { Dataset: JSON.stringify(carEntries), Seats: 5, CarID: 'Innova', Direction: req.body.direction, Date: req.body.date });
            }
        })
})

app.post('/EtiosBooking', urlencodedParser, function (req, res) {
    carModel.find({
        CarID: 'Etios',
        Date: req.body.date,
        DrivingDirection: req.body.direction

    }, {
            SeatNumber: 1
        }, (error, carEntries) => {
            if (error) {
                res.status(500).send({ error: "error in finding " })
            }
            else {
                //console.log(carEntries);
                res.render("CarDetails", { Dataset: JSON.stringify(carEntries), Seats: 5, CarID: 'Etios', Direction: req.body.direction, Date: req.body.date });
            }
        })
})

app.post('/EnjoyBooking', urlencodedParser, function (req, res) {
    carModel.find({
        CarID: 'Enjoy',
        Date: req.body.date,
        DrivingDirection: req.body.direction
    }, {
            SeatNumber: 1
        }, (error, carEntries) => {
            if (error) {
                res.status(500).send({ error: "error in finding " })
            }
            else {
                //console.log(carEntries);
                res.render("CarDetails", { Dataset: JSON.stringify(carEntries), Seats: 5, CarID: 'Enjoy', Direction: req.body.direction, Date: req.body.date });
            }
        })
})

app.post('/BookingDetails', urlencodedParser, function (req, res) {
    //console.log(req.body);
    for (var i = 0; i < req.body.check.length; i++) {
        //console.log(req.body.check[i]);
        carModel.create({
            SeatNumber: req.body.check[i],
            CarID: req.body.CarType,
            Date: req.body.journeyDate,
            DrivingDirection: req.body.direction
        }, (error, carEntry) => {
            if(!error)
            {
                res.render("BookingDetails", { seatNumbers: req.body.check });
            }
        })
    }
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

    //console.log(hashString);

    var hash = sha512(hashString);
    //console.log(hash);

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
