const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res,) => {
    return res.render('index.ejs')
});

app.listen(5000)