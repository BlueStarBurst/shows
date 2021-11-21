import express from 'express';
import bodyParser from 'body-parser';
import Data from './data.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
const data = new Data();

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    console.log("GET /")
});

app.post('/autofill', function (req, res) {
    console.log('Got body:', req.body);
    var name = "";
    if (req.body.str) {
        name = req.body.str;
    }
    res.send(data.getShowNames(name));
    
});

app.post('/addShow', function (req, res) {
    console.log('Got body:', req.body);
    data.createShow(req.body);
    res.sendStatus(200);
});

app.use(express.static('public', options))
app.listen(3000)

console.log('listening on port 3000');