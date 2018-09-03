const carModel = require('../../Model/CarModel');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CarEntries');

module.exports = (req, res) => {
    carModel.find({
        CarID: req.body.button,
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
                res.render("CarDetails", { Dataset: JSON.stringify(carEntries), Seats: 5, CarID: req.body.button, Direction: req.body.direction, Date: req.body.date });
            }
        })
}