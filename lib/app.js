'use strict';

let fs = require('fs');
let path = require('path');

let express = require('express');
let yamljs = require('yamljs');
let youtubeDownloader = require('youtube-downloader-node')(yamljs.load('conf.yml').binaries);

let app = express();
let server = app.listen(3000);

app.set('view engine', 'jade');
app.use('/static/app', express.static('public'));
app.use('/static/jquery', express.static('node_modules/jquery/dist'));
app.use('/static/font-awesome', express.static('node_modules/font-awesome'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/title/:url', (req, res) => {
    youtubeDownloader.title(req.params.url, (err, title) => res.json({title: title}));
});

app.get('/filename/:url', (req, res) => {
    youtubeDownloader.filename(req.params.url, (err, filename) => res.json({filename: filename}));
});

app.get('/download/video/:url', (req, res) => {
    youtubeDownloader.filename(req.params.url, (err, filename) => {
        let file = __dirname + '/../' + filename;
        if (fs.existsSync(file)) {
            streamFile(file, res);
            return;
        }
        let download = youtubeDownloader.downloadVideo(req.params.url);
        download.on('complete', () => {
            streamFile(file, res);
        });
    })
});

app.get('/download/audio/:url', (req, res) => {
    youtubeDownloader.filename(req.params.url, (err, filename) => {
        let file = videoFilenameToAudioFilename(__dirname + '/../' + filename);
        if (fs.existsSync(file)) {
            streamFile(file, res);
            return;
        }
        let download = youtubeDownloader.downloadAudio(req.params.url);
        download.on('complete', () => {
            streamFile(file, res);
        });
    });
});

function streamFile(file, res) {
    res.setHeader('content-type', 'application/octet-stream');
    res.setHeader('content-disposition', 'attachment; filename="' + path.basename(file) + '"');
    res.setHeader('content-length', fs.statSync(file).size);
    fs.createReadStream(file).pipe(res);
}

function videoFilenameToAudioFilename(filename) {
    return path.basename(filename, '.mp4') + '.mp3';
}
