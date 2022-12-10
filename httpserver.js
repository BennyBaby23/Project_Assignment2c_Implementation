const http = require('http'); 

http.createServer((req, res) => {

    res.writeHead(200,{'content-type': 'text-plain'});

    res.write('Hello world');
    res.end();
}).listen(3000);

console.log('web app ');
