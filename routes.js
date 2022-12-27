const fs = require('fs')

const requestHandler = (req, res) => {
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
        //by writing a callback function, we registered the function for Node to execute AFTER.
        //The order of the code matters. Eg. if the setHeader code get render before the 'end'
        //callback function, we will have an error as the setHeader is already called and we
        //can't call it again. We need to make sure that the callback function in 'end' get
        //execute first.  -- Event Driven Code or Event Driven Architecture
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            //parseBody (Buffer) is what we want to use.
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1]
            console.log(parseBody)
            //writeFileSync vs writeFile - Sync will block all the code after this line until writeFile is done
            //it should not be use if the file is massive.
            fs.writeFile('text.txt', message, err => {
                res.statusCode = 302;
                //Redirect to the home page
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<body><h1>Hello</h1></body>')
    res.write('</html>')
    res.end()
}


module.exports = requestHandler

// or

// module.exports = {
//     handler: requestHandler,
//     someText : 'this is a text'
// }

//or
//module is omit - Nodejs feature.
// exports.handler = requestHandler
// exports.text = 'this is a text'