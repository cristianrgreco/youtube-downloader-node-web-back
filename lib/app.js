'use strict';

let express = require('express');
let youtubeDownloader = require('youtube-downloader-node')(require('yamljs').load('conf.yml').binaries);

let app = express();
let server = app.listen(3000);

app.use('/static', express.static('public'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/title/:url', (req, res) => {
    youtubeDownloader.title(req.params.url, (err, title) => {
        res.render('title', {title: title});
        res.end();
    });
});

app.get('/filename/:url', (req, res) => {
    youtubeDownloader.filename(req.params.url, (err, filename) => {
        res.render('filename', {rFilename: filename});
        res.end();
    });
});
