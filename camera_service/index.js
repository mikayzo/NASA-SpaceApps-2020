const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = 80
const east = Math.PI / 2;
const south = Math.PI;
const interval = Math.PI / 8;

app.use(bodyParser.json())

app.post('/takepic', (req, res) => {
    if (between(req.body.alpha, east, east + interval)) {
        res.send("https://nasa2020-canyouhearmenow-mars-bucket.s3.eu-north-1.amazonaws.com/0.jpg")
    } else if (between(req.body.alpha, east + interval, east + 2 * interval)) {
        res.send("https://nasa2020-canyouhearmenow-mars-bucket.s3.eu-north-1.amazonaws.com/1.jpg")
    } else if (between(req.body.alpha, east + 2 * interval, east + 3 * interval)) {
        res.send("https://nasa2020-canyouhearmenow-mars-bucket.s3.eu-north-1.amazonaws.com/2.jpg")
    } else if (between(req.body.alpha, east + 3 * interval, south)) {
        res.send("https://nasa2020-canyouhearmenow-mars-bucket.s3.eu-north-1.amazonaws.com/3.jpg")
    } else {
        res.send("https://nasa2020-canyouhearmenow-mars-bucket.s3.eu-north-1.amazonaws.com/other.jpg");
    }
})

app.listen(port, "", () => {
})

function between(x, min, max) {
    return x >= min && x < max;
}
