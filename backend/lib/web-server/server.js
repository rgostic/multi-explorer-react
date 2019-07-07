'use strict';

var http = require('http');
var url = require('url');
var sys = require('sys');

function parseQueryString(query) {
	var queryString = {};

	if (query !== undefined && query !== null) {
		var params = query.split('&');

		var queryString = {};
		params.forEach(function(param) {
			var kv = param.split('=');
			queryString[kv[0]] = kv[1];
		});			
	}

	return queryString;
}

function start(route, handles) {
	function onRequest(request, response) {
		response.setHeader('Access-Control-Allow-Origin', '*');    
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');    
    response.setHeader('Access-Control-Allow-Credentials', true);		

		request.setEncoding('utf8');
		var path = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;		
		var queryString = parseQueryString(query);

		var postData = '';
		request.addListener('data', function(postDataChunk) {
			postData += postDataChunk;
			console.log('received chunk');
			postDataChunk + "'.";
		});	

		request.addListener('end', function() {
			route(handles, path, queryString, response, postData);
		});		
	}

	http.createServer(onRequest).listen(8888);
	
	console.log('server started');
}

module.exports = start;