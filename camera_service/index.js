//const fs = require('fs');
//const YAML = require('yaml')
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 80

const east = Math.PI/2;
const south = Math.PI;
const interval = Math.PI/8;
const url = "http://" + process.env.HOSTNAME;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/', (req, res) => { 
    if (between(req.body.alpha, east, east + interval)) {
      res.send(url + "/0")
    } else if (between(req.body.alpha, east + interval, east + 2*interval)) {
      res.send(url + "/1")
    } else if (between(req.body.alpha, east + 2*interval, east + 3*interval)) {
      res.send(url + "/2")
    } else if (between(req.body.alpha, east + 3*interval, south)) {
      res.send(url + "/3")
    } else {
      res.send("Try turning another way :)");
    }
})

app.get('/0', (req, res) => { 
  res.render('pic.html', { image: "0.jpg" });
})
app.get('/1', (req, res) => { 
  res.render('pic.html', { image: "1.jpg" });
})
app.get('/2', (req, res) => { 
  res.render('pic.html', { image: "2.jpg" });
})
app.get('/3', (req, res) => { 
  res.render('pic.html', { image: "3.jpg" });
})

app.listen(port, "", () => {
})

function between(x, min, max) {
  return x >= min && x < max;
}
