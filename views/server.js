import  express  from "express";
import __dirname from "../__dirname.js";
import path from 'path';

let app = express();

app.get('/weatherNow', function(req, res){
    res.sendFile(__dirname + '/views/weatherNow.html');
});

app.use(express.static(path.join(__dirname, '/views/')))
    

app.listen(3000, function(req, res) {
	console.log('running');
})