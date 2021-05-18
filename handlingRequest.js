const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method } = request;

    if(method === 'GET') {
        response.end('Ini adalah request dengan method. \n');
    }

    if(method === 'POST') {
        
        let body = [];

        request.on('data', (chunk) => {
           body.push(chunk); 
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`Hai, ${name} \n`);
        });

    }

    // if(method === 'PUT') {
    //     response.end('Ini adalah request dengan method PUT. \n');
    // }

    // if(method === 'DELETE') {
    //     response.end('Ini adalah request dengan method DELETE. \n');
    // }
};

// method createServer menerima satu parameter custom callback sebagai request listener.
const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});