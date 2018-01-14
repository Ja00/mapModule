const express = require('express');
const path = require('path');
const app = express();

const PORT_NUMBER = 8080;



app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));

app.listen(PORT_NUMBER, function() {
	console.log("connected!");
})