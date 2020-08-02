const http = require('http');

http.createServer((request,response) => {
    let body = [];
    request.on('error',(err) => {
        console.error(err);
    }).on('data',(chunk) => {
        body.push(chunk.toString);
    }).on('end',() => {
        // body = Buffer.concat(body).toString();
        console.log("body:",body);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(`<html lang="en">
        <head>
            <title>test</title>
            <style>
        #container {
            width:500px;
            height:300px;
            display:flex;
            background-color: red;
        }
        #container #myid {
            width:200px;
            height: 200px;
            background-color: gray;
        }
        #container .c1 {
            flex: 1;
            background-color: green;
        }
            </style>
        </head>
        <body>
            <div id="container">
                <div id="myid"></div>
                <div class="c1"></div>
            </div>
        </body>   
        </html>`);
    });
}).listen(8088);

console.log("server started");