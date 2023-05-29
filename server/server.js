import  express  from "express";
import __dirname from "../__dirname.js";
import path from 'path';
import fs from 'fs';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

let app = express();
let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(expressSession({
	secret: secret,
}));

app.get('/weatherNow', async function(req, res){
    req.session.test = 'abcde'
    let layout = await fs.promises.readFile(__dirname + '/client/pages/weatherNow.html', 'utf-8');
    layout = layout.replace('<input class="searchInput" placeholder="Введите названия локации"></input>', '<input class="searchInput" placeholder="Введите названия локации" value="' + req.session.test + '">')
    console.log(layout);
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(layout);
	res.end();
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
    

app.listen(3000, function(req, res) {
	console.log('running');
})