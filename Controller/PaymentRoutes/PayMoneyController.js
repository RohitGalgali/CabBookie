const sha512 = require("js-sha512");
const request = require('request');
var header = '**************************'; //will be provided by payumoney


module.exports = (req, res) => {
    var salt = '****************';
    var hashString = '';
    hashString += "************|";
    hashString += req.body.txnid + "|";
    hashString += req.body.amount + "|";
    hashString += req.body.productinfo + "|";
    hashString += req.body.firstname + "|";
    hashString += req.body.email + "|";
    hashString += "||||||||||"
    hashString += salt;

    var hash = sha512(hashString);

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
}
