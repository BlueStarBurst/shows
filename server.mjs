import express from 'express';
import bodyParser from 'body-parser';
import Data from './data.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import { readFileSync, readFile } from 'fs';
import https from 'https';

import pkg from 'uuid';
const { v4: uuidv4 } = pkg;

var privateKey = readFileSync('secure/key.pem', 'utf8');
var certificate = readFileSync('secure/cert.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate, passphrase: 'blue' };

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

app.post('/auth', function (req, res) {
    // console.log(req.headers.authorization)
    if (uuids[req.headers.authorization]) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
    console.log("POST /auth")
});

app.post('/ticketShowRequests', function (req, res) {
    if (!uuids[req.headers.authorization]) {
        res.sendStatus(401)
        return;
    } 

    let showRequests = data.getShowRequests();
    res.send(showRequests);

    console.log("POST /ticketShowRequests")
});

app.post('/login', function (req, res) {
    // res.sendFile(__dirname + '/dist/index.html');
    var genuuid = uuidv4();
    uuids[genuuid] = res;
    console.log(genuuid);
    console.log(Object.keys(uuids));

    setTimeout(() => {
        console.log("session " + genuuid + " has expired!")
        delete uuids[genuuid];
        console.log(Object.keys(uuids))
    }, req.body.time);

    bcrypt.compare(req.body.pass, users.hash, function (err, result) {
        if (result && req.body.user == users.user) {
            res.send(genuuid)
        } else {
            res.sendStatus(400);
        }
    });

    console.log("POST /login")
});

app.post('/autofill', function (req, res) {
    // console.log('Got body:', req.body);
    var name = "";
    if (req.body.str) {
        name = req.body.str;
    }
    res.send(data.getShowNames(name));
});

app.post('/createShowRequest', function (req, res) {
    // console.log('Got body:', req.body);
    let save = data.createShowTicket(req.body);
    if (save) {
        res.sendStatus(200);
    } else {
        res.sendStatus(409);
    }
});

app.post('/approveShow', function (req, res) {
    if (!uuids[req.headers.authorization]) {
        res.sendStatus(401)
        return;
    } 

    let save = data.approveShow(req.body);
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

// console.log(bcrypt.hashSync("4uBRxb5Y66DFPb5", bcrypt.genSaltSync()))