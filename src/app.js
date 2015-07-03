'use strict';

let app = require('express')();

let server = app.listen(3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
