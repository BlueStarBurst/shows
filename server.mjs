import express from 'express';
import bodyParser from 'body-parser';
import Data from './data.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import { readFileSync, readFile } from 'fs';
import https from 'https';

import { v4 as uuidv4 } from 'uuid';

var privateKey  = readFileSync('secure/key.pem', 'utf8');
var certificate = readFileSync('secure/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'blue'};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
const data = new Data();

var uuids = {}

var users = {}
readFile('./secure/users.json', 'utf8', (err, data) => {
    users = JSON.parse(data);
});

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
    res.sendFile(__dirname + '/dist/index.html');
    console.log("GET /")
});

app.get('/admin', function (req, res) {
    console.log(req.get('Authorization'));
    console.log(req.headers.Authorization);
    // res.sendFile(__dirname + '/dist/admin.html');
    res.sendFile(__dirname + '/dist/adminBundle.js');
    console.log("GET /admin")
});

app.post('/login', function (req, res) {
    // res.sendFile(__dirname + '/dist/index.html');
    var genuuid = uuidv4();
    uuids[genuuid] = req.body.time;
    console.log(genuuid);

    setTimeout(() => {
        delete uuids[genuuid];
    },req.body.time);
    
    bcrypt.compare(req.body.pass, users.hash, function (err, result) {
        if (result && req.body.user == users.user) {
            res.send(genuuid)
            // res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    });

    console.log("POST /login")
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
    let save = data.createShow(req.body);
    if (save) {
        res.sendStatus(200);
    } else {
        res.sendStatus(409);
    }
});

app.use(express.static('dist', options))

// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(443)
// console.log('listening on port 443');

app.listen(5000);
console.log('listening on port 5000');

console.log(bcrypt.hashSync("4uBRxb5Y66DFPb5", bcrypt.genSaltSync()))