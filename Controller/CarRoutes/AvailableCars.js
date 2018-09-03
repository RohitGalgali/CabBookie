module.exports = (req, res) => {
    if (req.params.id == 'a2p') {
        res.render("AvailableCars", { direction: 'a2p' });
    }
    else if (req.params.id == 'p2a') {
        res.render("AvailableCars", { direction: 'p2a' });
    }
}