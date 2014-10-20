var sys = require('sys'),
  my_http = require('http'),
  path = require('path'),
  url = require('url'),
  filesys = require('fs');

my_http.createServer(function(request,response) {
  var my_path = url.parse(request.url).pathname;
  var full_path = path.join(process.cwd(), my_path);
  path.exists
};