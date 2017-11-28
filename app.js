const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/af-ZA'));
app.use(express.static(__dirname + '/dist/en-US'));

// Connect server to Angular index.html
app.get('*', (req, res) => {
    const lang = req.headers['lang'];
    if (lang === 'af-ZA') {
        res.sendFile(`index.html`, { root: './dist/af-ZA/' });
    } else if (lang === 'en-US') {
        res.sendFile(`index.html`, { root: './dist/en-US/' });
    } else {
        res.sendFile(`index.html`, { root: './dist/en-US/' });
    }
});

// Start Server
app.listen(port, () => {
    console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});