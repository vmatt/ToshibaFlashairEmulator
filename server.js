var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

app.get('/command.cgi', function (req, res) {
	console.log(req.query);
	var p="./"+req.query.DIR;
	fs.readdir(p, function (err, files) {
		if (err) {
			res.end("Érvénytelen URL");
		}
		else {
			var output="LANSD_FILELIST\r\n";
			files.forEach(function (item){
				output= output.concat(req.query.DIR+","+item+",0,00,00000,00000\r\n");
			})
			res.end(output);
		}
	});
});
app.use(function(req, res, next) {
    console.log('Közvetlen URL lekérdezés: "%s"', req.originalUrl);
    next();
}, express.static('.'));

app.get('/thumbnail.cgi', function (req, res) {
	res.redirect('./thumbnails'+req._parsedOriginalUrl.query);
});

var server = app.listen(8080, function () {
  var port = server.address().port
	console.log("Az SD emulátor elérhető a %s-es porton", port);
  })
