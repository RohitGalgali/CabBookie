module.exports = (req, res) => { 
    console.log(req.body);
    res.render("SuccessPage", {
        txnId: req.body.txnid, productInfo: req.body.productinfo,
        amount: req.body.amount, firstName: req.body.firstname, lastName: req.body.lastname
    });
}