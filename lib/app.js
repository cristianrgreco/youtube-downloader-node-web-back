'use strict';

let express = require('express');
let yamljs = require('yamljs');
let youtubeDownloader = require('youtube-downloader-node')(yamljs.load('conf.yml').binaries);

let app = express();
let server = app.listen(3000);

app.get('/title/:url', (req, res) => {
    youtubeDownloader.title(req.params.url, (err, title) => res.json({title: title}));
});

app.get('/filename/:url', (req, res) => {
    youtubeDownloader.filename(req.params.url, (err, filename) => res.json({filename: filename}));
});
