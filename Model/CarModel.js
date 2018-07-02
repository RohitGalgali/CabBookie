var carModel = {
    carName : "MyModelCar", 
    seats : [1,2,3,4,5],
    getAvailableSeats : function() {
        return [1,2];
    }
};

module.exports = carModel;