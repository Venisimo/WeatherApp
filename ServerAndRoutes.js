import  express  from "express";
import __dirname from "./__dirname.js";
import path from 'path';

let app = express();

app.get('/weatherNow', async function(req, res){
    res.sendFile(__dirname + '/client/pages/weatherNow.html');
});

app.get('/weatherThreeDays', function(req, res){
    res.sendFile(__dirname + '/client/pages/weatherThreeDays.html');
});

app.get('/weatherWeek', function(req, res){
    res.sendFile(__dirname + '/client/pages/weatherWeek.html');
});

app.get('/weatherTenDays', function(req, res){
    res.sendFile(__dirname + '/client/pages/weatherTenDays.html');
});

app.use(express.static(path.join(__dirname, '/client/')))
    
app.use(function(req, res, next) {
    res.status(404).sendFile('/Лысов_НАДИП/4 курс/Project_Nadip/client/pages/Page404.html');
});

app.listen(3001, function(req, res) {
	console.log('running');
})

