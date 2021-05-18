// 1. panggil module http
// 2. buat requestListener dengan parameter request dan response
    // 2.1 Mendefinisikan header dan status code untuk response
    // 2.2 membuat handling request yang menerima properti method dan url dari request

// 3. panggil method http.createServer() berisi requestListener dengan nama server
// 4. mendefinisikan port dan host untuk server
// 5. panggil method listen dari server berisi port, host, dan callback function untuk menjalankan server 

const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    // properti method dan url yang diterima oleh request
    const { url, method } = request;

    if(url === '/') {
        
        if(method === 'GET') {
            response.statusCode = 200;
            response.end('Ini adalah homepage. \n');
        } else {
            response.statusCode = 400;
            response.end(`Halaman ini tidak dapat diakses dengan method ${method}! \n`);
        }
        
    } else if(url === '/about') {
        
        if(method === 'GET') {
            response.statusCode = 200;
            response.end('Halo! ini adalah halaman about. \n');
        } else if(method === 'POST') {
            
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });
            
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(`Halo, ${name}! Ini adalah halaman about. \n`);
            });
        } else {
            response.statusCode = 400;
            response.end(`Halaman ini tidak dapat diakses dengan method ${method}! \n`);
        }

    } else {
        response.statusCode = 404;
        response.end('<h1>404, Halaman tidak ditemukan!</h1> \n');
    }
    
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});