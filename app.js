const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const NavigationRoutes = require("./Controller/Navigations");
const CarRoutes = require("./Controller/CarRoutes");
const PaymentRoutes = require("./Controller/PaymentRoutes");

app.set('view engine', 'ejs');
app.use(express.static('Resources'));
app.listen(777);

app.get('/', NavigationRoutes.HomeController);

app.get("/about", NavigationRoutes.AboutController);

app.get("/services", NavigationRoutes.ServicesController);

app.get("/contact", NavigationRoutes.ContactController);

app.get('/availablecars/:id', CarRoutes.AvailableCarsController);

app.post('/SeatingDetails', urlencodedParser, CarRoutes.SeatingDetailsController);

app.post("/SuccessPage", urlencodedParser, PaymentRoutes.SuccessPageController);

app.post("/FailurePage", urlencodedParser, PaymentRoutes.FailurePageController);

app.post('/BookingDetails', urlencodedParser, PaymentRoutes.BookingDetailsController);

app.post('/payMoney', urlencodedParser, PaymentRoutes.PayMoneyController);