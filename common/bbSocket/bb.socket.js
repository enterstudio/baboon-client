/*global angular, io*/
angular.module('bb.socket', [])
    // Wrapper service for socket.io
    .factory('bbSocket', ['$rootScope', '$window', '$location', '$log', 'bbModal', function ($rootScope, $window, $location, $log, bbModal) {
        var protocol = $window.location.protocol,
            hostname = $window.location.hostname,
            port = $window.location.port,
            transports = ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'],
            host;

        // detect karma test runner and remove wensocket from transports (default karma port is 9876)
        if (port > 9870 && port < 9900 && hostname === 'localhost') {
            transports = ['xhr-polling'];
        }

        // create host for connect
        if (port.length > 0) {
            host = protocol + '//' + hostname + ':' + port;
        }
        else {
            host = protocol + '//' + hostname;
        }

        // socket connect
        var socket = io.connect(host, {'connect timeout': 4000, 'transports': transports});

        // socket.io events
        socket.on('disconnect', function () {
            $log.error('Lost connection to Socket.IO');

            $rootScope.$apply(function () {
                bbModal.msgBox('Lost connection to server!','', 'Warning');
            });
        });

        socket.on('connect', function () {
            $log.log('socket.io connected with: ' + socket.socket.transport.name);
        });

        socket.on('connect_error', function (err) {
            $log.error('connect_error: ', err);

            $rootScope.$apply(function () {
                bbModal.msgBox('Could not connect to socket server!','', 'Error');
            });
        });

        socket.on('connect_timeout', function () {
            $log.error('connect_timeout...');
        });

        socket.on('reconnect', function (transport) {
            $log.log('socket.io reconnect with: ' + transport);

            $rootScope.$apply(function () {
                bbModal.reset(); //close
            });
        });

        socket.on('reconnecting', function () {
            var reconnectionAttempts = arguments[1] || 0;
            $log.log('Try to reconnect with: ' + socket.socket.transport.name + ', attempt: ' + reconnectionAttempts);

            $rootScope.$apply(function () {
                if (reconnectionAttempts === 1) {
                    bbModal.message += ' Trying to reconnect. Attempt: ' + reconnectionAttempts;
                } else {
                    bbModal.message = bbModal.message.replace((reconnectionAttempts - 1).toString(), reconnectionAttempts);
                }
            });
        });

        socket.on('reconnect_error', function (err) {
            $log.error('socket.io reconnect_error: ', err);
        });

        socket.on('reconnect_failed', function () {
            $log.error('socket.io reconnect_failed');
        });

        socket.on('site_reload', function () {
            $log.warn('Site Reload triggered by Server');

            $rootScope.$apply(function () {
                bbModal.msgBox('','Session is expired! Please reload the site.', 'Warning', function () {
                    window.location.reload();
                });
            });
        });

        // api
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;

                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;

                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);

