app = require("express")();


//http = require("http").startServer(app);
io = require("socket.io-client");

config = {
    socketURL: "https://socket.etherdelta.com",
    port: 3000
}

var prev_good = undefined;

app.get('/ed/orderbook', function(req, res, next){
    console.log("Received Token Address: " + req.query.tokenAddr);

    socket = io.connect(config.socketURL, {transports: ['websocket']});
    socket.emit("getMarket", {token: req.query.tokenAddr, user: req.query.userAddr});
    socket.on("market",  function(data){
	     
	    res.contentType('application/json');
	    res.send(checkOutput(JSON.parse(JSON.stringify(data))));
    });

});

console.log("Listening on:" + config.port);
app.listen(config.port);


//Helpers

function checkOutput(_op){
    if (_op["returnTicker"] != undefined) {
        prev_good = _op;
	return _op;
    } else {
        return prev_good;
    }

}

