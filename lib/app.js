'use strict';

let express = require('express');

let app = express();
let server = app.listen(3000);

app.use('/static', express.static('public'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index');
});
