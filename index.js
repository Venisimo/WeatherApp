import express from 'express';
import nunjucks from 'nunjucks';
import __dirname from './__dirname.js';

let days = {20: {morning: '-20', day: '-8', evening: '-10', night: '-12'}, 
            21: {morning: '-12', day: '-5', evening: '-9', night: '-14'},
            22: {morning: '-10', day: '-2', evening: '-4', night: '-7'},
            23: {morning: '-5', day: '+1', evening: '+2', night: '-1'}, 
            24: {morning: '-2', day: '+3', evening: '+2', night: '-1'}, 
            25: {morning: '-2', day: '+4', evening: '+5', night: '+3'}, 
            26: {morning: '+2', day: '+4', evening: '+3', night: '+2'}
            };
let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app    
});

app.get('/', function(req, res){
    res.render('index.html', {"days": days})
});

    

app.listen(3000, function(req, res) {
	console.log('running');
})