import  express  from "express";
import __dirname from "../__dirname.js";
import path from 'path';

let app = express();

app.get('/weatherNow', function(req, res){
    res.sendFile(__dirname + '/views/weatherNow.html');
});

app.get('/weatherThreeDays', function(req, res){
    res.sendFile(__dirname + '/views/weatherThreeDays.html');
});

app.get('/week', function(req, res){
    res.sendFile(__dirname + '/views/week.html');
});

app.get('/tenDays', function(req, res){
    res.sendFile(__dirname + '/views/tenDays.html');
});

app.use(express.static(path.join(__dirname, '/views/')))
    

app.listen(3000, function(req, res) {
	console.log('running');
})