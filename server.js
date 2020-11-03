// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// ! DATE
function dateToUnix(date_string) {
    let unix = new Date(date_string).getTime() / 1000;
    return unix;
}

function dateToUTC(date_string) {
    let utc = new Date(date_string).toUTCString();
    return utc;
}
// !

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// ! Example Output:
// ! {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/', (req, res) => {
    unixTimestamp = Date.now() / 1000;
    let dateObject = new Date(unixTimestamp * 1000);
    res.json({ unix: unixTimestamp, utc: dateObject.toUTCString() });
});

app.get('/api/timestamp/:date_str', (req, res) => {
    let date_str = req.params.date_str;

    if (Number(date_str)) {
        let dateObject_ = new Date(Number(date_str) * 1000);
        res.json({
            unix: Number(date_str) / 1000,
            utc: dateObject_.toUTCString(),
        });
    } else if (dateToUTC(date_str) === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
    } else {
        res.json({ unix: dateToUnix(date_str), utc: dateToUTC(date_str) });
    }
});

// listen for requests :)
// ! var listener = app.listen(process.env.PORT, function () {
// !    console.log('Your app is listening on port ' + listener.address().port);
// !});

// *Remove at the end
app.listen(3000);
