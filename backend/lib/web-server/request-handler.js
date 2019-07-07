'use strict';

var util = require('util');
var blockchainRepo = require('./../blockchain-repo');
var supportedCryptos = require('./../util/supported-cryptos');

// DEPRICATED: Moved to react front-end
function start(response, queryString, postData) {	
  response.writeHead(200, {'Content-Type': 'text/html'});

  response.write(`
    <form action='/search' method='GET'>
      <input type='text' name='address' />
      <select name='cryptoId'>
    `);  

  supportedCryptos().then(function (cryptos) {
    
    var cryptoOptions = '';

    cryptos.forEach(function(crypto) {
      cryptoOptions += '<option value="' + crypto + '">' + crypto + '</option>';
    });

    response.write(cryptoOptions);
  
    response.write('</select>');
    response.write('<input type="submit" value="Search" />');
    response.write('</form>');
    response.end();
  });
}

// TODO: API Documentation
function search(response, queryString, postData) {
  var address = queryString.address;
  var cryptoId = queryString.cryptoId;

  _getAddressTransactions(response, postData, address, cryptoId);
}

function _getAddressTransactions(response, postData, address, cryptoId) {
	var html = '';  
  
  blockchainRepo[cryptoId.toLowerCase()](address).then(function (transactions) {
    var txsWrapped = [];
    var txWrapped = {};

    transactions.forEach(function(tx) {
      txWrapped = {
        hash : tx.hash,
        time : tx.timeStamp,
        from : tx.from,
        to   : tx.to,
        conf : tx.confirmations,
        val  : tx.value 
      };

      txsWrapped.push(txWrapped);
    });

    response.writeHead(200, {'Content-Type': 'application/json'});    
    response.write(JSON.stringify(txsWrapped));
    
    response.end();
  });  
}

module.exports = {
	start,
  search  
}