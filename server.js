'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./example/routes');
var navigation = require('./example/routes/navigation.js');
var files = require('./example/routes/files.js')();
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');
var session = require('./example/routes/session')();


var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'example', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'secret',
    cookie: {expires: false}
}));
app.use(lessMiddleware({
    src: __dirname + '/example/public',
    compress: true
}));
app.use(express.static(path.join(__dirname, 'example', 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'modules')));
app.use(express.static(path.join(__dirname, '.dist', 'docs')));
app.use(app.router);
app.use(express.errorHandler());


app.post('/api/echo', function(req, res) {

    console.log('## REST: received from the client:');
    console.log(req.body);

    if(req.body.error) {

        var error = {
            name: 'EchoTestError',
            resource: 'api/echo',
            statusCode: 401,
            message: 'Fake echo test error'
        };

        res.json(error.statusCode, error);
    }
    else {
        res.json(200, req.body);
    }
});

app.post('/api/lib/session/setActivity', session.setActivity);
app.post('/api/lib/session/getLastActivity', session.getLastActivity);
app.post('/api/lib/session/getData', session.getData);
app.post('/api/lib/session/setData', session.setData);
app.post('/api/lib/session/deleteData', session.deleteData);
app.post('/api/lib/files/getMarkdown', files.getMarkdown);

app.use('/api/lib/navigation/getTopList', navigation.getTopList);
app.use('/api/lib/navigation/getSubList', navigation.getSubList);

app.get('/doc', function(req, res) {
    //res.sendfile(path.join(__dirname, '.dist/docs/index.html'));
    res.render('doc/index');
});

app.get('/*', function(req, res) {
    //res.sendfile(path.join(__dirname, 'example/views/index.html'));
    res.render('index');
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', 'push this news from server when client connection is successfully');

    socket.on('api/echo', function (data, callback) {
        if(data.error) {
            var error = {
                name: 'EchoTestError',
                resource: 'api/echo',
                statusCode: 401,
                message: 'Fake echo test error'
            };

            callback(error);
        } else{
            callback(null, data);
        }
    });

    socket.on('echo', function (data, callback) {
        console.log('## Socket: received from the client:');
        console.log(data);
        callback(null, data);
    });

});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
