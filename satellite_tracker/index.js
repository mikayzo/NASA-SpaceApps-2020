const fs = require('fs');
const YAML = require('yaml')
const express = require('express');
const app = express()
const port = 8080

let configFile = fs.readFileSync('config.yaml', 'utf8');
let config = YAML.parse(configFile);

let tracker_info = {
    'ORBITER_VISIBLE': true ,
    'WINDOW_TIME_LEFT': config.COMM_WINDOW_TIME,
    'NEXT_WINDOW': config.COMM_WINDOW_TIME + config.RADIO_SILENCE_TIME,
}

app.get('/', async (req, res) => {
    res.json(tracker_info);
})

app.get('*', function(req, res) {
    res.status(404).send();
});

app.listen(port, () => {
    setInterval(calculate_time, 1000)
})

function calculate_time() {
    if (tracker_info.NEXT_WINDOW == 0) {
        tracker_info.ORBITER_VISIBLE = true
        tracker_info.WINDOW_TIME_LEFT = config.COMM_WINDOW_TIME;
        tracker_info.NEXT_WINDOW = config.COMM_WINDOW_TIME + config.RADIO_SILENCE_TIME;
    } else {
        tracker_info.NEXT_WINDOW = tracker_info.NEXT_WINDOW - 1;
    }

    if (tracker_info.WINDOW_TIME_LEFT <= 0) {
        tracker_info.ORBITER_VISIBLE = false
    } else {
        tracker_info.WINDOW_TIME_LEFT = tracker_info.WINDOW_TIME_LEFT - 1;
    }
}
