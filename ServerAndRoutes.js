import  express  from "express";
import __dirname from "./__dirname.js";
import path from 'path';

let app = express();
const PORT = 3000;

app.get('/weatherNow', async function(req, res){
    res.sendFile(__dirname + '/ClientAndServer/pages/weatherNow.html');
});

app.get('/weatherThreeDays', function(req, res){
    res.sendFile(__dirname + '/ClientAndServer/pages/weatherThreeDays.html');
});

app.get('/weatherWeek', function(req, res){
    res.sendFile(__dirname + '/ClientAndServer/pages/weatherWeek.html');
});

app.get('/weatherTenDays', function(req, res){
    res.sendFile(__dirname + '/ClientAndServer/pages/weatherTenDays.html');
});

app.get('/', function (req, res) {
    res.redirect('/weatherNow');
});

app.use(express.static(path.join(__dirname, '/ClientAndServer/')))
    
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname,'/ClientAndServer/pages/Page404.html'));
});

app.listen(PORT, function(req, res) {
	console.log('running');
})

