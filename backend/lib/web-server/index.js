'use strict';

var server = require('./server');
var router = require('./router');
var requestHandler = require('./request-handler');
var supportedCryptos = require('./../util/supported-cryptos');
var handles = {};

// DEPRICATED: Moving to react front-end and Pure Service Backend
handles['/'] = requestHandler.start;
handles['/explorer'] = requestHandler.start;
handles['/search'] = requestHandler.search;

// DEPRICATED: Moving to react front-end and Pure Service Backend
supportedCryptos().then(function (cryptos) {
    cryptos.forEach(function (crypto) {
    handles['/' + crypto] = requestHandler.search;
  });
});

function run() {
  server(router.route, handles);
}

module.exports = run;