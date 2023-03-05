import "./index.css"

let div = document.createElement('div')
div.innerHTML = 'welcome to my github !!!'

// index.js
const hello = require('./hello.js');
document.querySelector("#root").appendChild(hello());

document.querySelector('#root').appendChild(div)

var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.end('zmd\n');

}).listen(8888)

console.log('server start');