const path = require('path');
const Express = require('express');
const config = require('./webpack.config');

const app = new Express();
const port = 8888;

app.use(Express.static(path.join(__dirname, '/')));
app.get('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    // res.header('','');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.sendFile(path.join(__dirname, '/'));
});

app.listen(port, '0.0.0.0', (err) => {
    if (err) console.log(err);
    console.info('===> Listening on port %s. Open up http://0.0.0.0:%s/ in your broswer.', port, port);
});
