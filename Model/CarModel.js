// var carModel = {
//     carName : "MyModelCar", 
//     seats : [1,2,3,4,5],
//     getAvailableSeats : getSeats()
// };

// function getSeats(){
//     return [1,2,3,4];
// }

// module.exports = carModel;

const mongoose = require('mongoose');

const carEntrySchema = new mongoose.Schema({
SeatNumber: Number,
CarID: String,
Date: { type: Date, default: Date.now },
DrivingDirection: String
});

const carEntries = mongoose.model('CarBooking', carEntrySchema);

module.exports = carEntries;