const net = require('net');
const files = require('./files.js');

const PORT = 8080;
let date = new Date();
date = date.toUTCString();
const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    // read incoming data
    console.log('data');
    console.log(chunk.toString());
    strData = chunk.toString();

    // parse the string
    let splitArr = strData.split('\r\n');
    // console.log(splitArr);
    let URL = splitArr[0].slice(splitArr[0].indexOf('/'), splitArr[0].indexOf('H') - 1);

    // grab the right file
    let response = '';
    let code = ''
    if (URL === '/' || URL === '/index.html'){
        code = '200 OK';
        response = `HTTP/1.1 ${code}\nServer: jah\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${files.index.length}\nConnection: keep-alive\n\n
        ${files.index}`;
    } else if (URL === '/helium.html'){
        code = '200 OK';
        response = `HTTP/1.1 ${code}\nServer: jah\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${files.helium.length}\nConnection: keep-alive\n\n
        ${files.helium}`;
    } else if (URL === '/hydrogen.html'){
        code = '200 OK';
        response = `HTTP/1.1 ${code}\nServer: jah\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${files.hydrogen.length}\nConnection: keep-alive\n\n
        ${files.hydrogen}`;
    } else if (URL === '/styles.css'){
        code = '200 OK';
        response = `HTTP/1.1 ${code}\nServer: jah\nDate: ${date}\nContent-Type: text/css; charset=utf-8\nContent-Length: ${files.styles.length}\nConnection: keep-alive\n\n
        ${files.styles}`;
    } else {
        code = '404 NOT FOUND';
        response = `HTTP/1.1 ${code}\nServer: jah\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${files.notFound.length}\nConnection: keep-alive\n\n
        ${files.notFound}`;
    }

    // write outgoing data
    socket.write(response);
    socket.end();
  });

  socket.on('end', () => {
    // handle client disconnect
    console.log('connection closed');
  });

  socket.on('error', (err) => {
    // handle error in connection
    console.log('404 NOT FOUND');
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});