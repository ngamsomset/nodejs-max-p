const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
    const url = req.url
    const method = req.method

    if(url === '/') {
        res.write('<html>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button>Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/message' && method === 'POST'){
        //Parsing request body
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end', () => {
            //parseBody (Buffer) is what we want to use.
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1]
            console.log(parseBody)
            fs.writeFileSync('text.txt', message)
        })
        res.statusCode = 302;
        //Redirect to the home page
        res.setHeader('Location', '/')
        return res.end()
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<body><h1>Hello</h1></body>')
    res.write('</html>')
    res.end()
});

server.listen(3000);