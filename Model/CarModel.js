const mongoose = require('mongoose');

const carEntrySchema = new mongoose.Schema({
SeatNumber: Number,
CarID: String,
Date: { type: Date, default: Date.now },
DrivingDirection: String
});

const carEntries = mongoose.model('CarBooking', carEntrySchema);

module.exports = carEntries;