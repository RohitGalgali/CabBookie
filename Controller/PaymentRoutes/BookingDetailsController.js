const carModel = require('../../Model/CarModel');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CarEntries');

module.exports = (req, res) => {
    for (var i = 0; i < req.body.check.length; i++) {
        carModel.create({
            SeatNumber: req.body.check[i],
            CarID: req.body.CarType,
            Date: req.body.journeyDate,
            DrivingDirection: req.body.direction
        }, (error, carEntry) => {
            if (!error) {
                res.render("BookingDetails", { seatNumbers: req.body.check });
            }
        })
    }
}