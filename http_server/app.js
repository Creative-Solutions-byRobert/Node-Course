const http = require( 'http' )
const fs = require( 'fs' )

const server = http.createServer( ( req, res ) => {
	const url = req.url
	const method = req.method

	if ( url === '/' ) {
		res.write( '<html><head>' )
		res.write( '<title>My Server Example with HTTP</title>' )
		res.write( '<body>' )
		res.write( '<form action="/message" method="POST">' )
		res.write( '<input type="text" name=" message">' )
		res.write( '<button type="submit">Click me</button>' )
		res.write( '</body>' )
		res.write( '</html>' )
		return res.end()
	}
	if ( url === '/message' && method === 'POST' ) {
		const body = []
		req.on( 'data', ( chunk ) => {
			body.push( chunk )
		} )
		return req.on( 'end', () => {
			const parseBody = Buffer.concat( body ).toString()
			const message = parseBody.split( '=' )[ 1 ]
			fs.writeFile( 'message.txt', message, () => {
				res.statusCode = 302
				res.setHeader( 'Location', '/' )
				return res.end()

			} )
		} )
	}
	res.setHeader( 'Content-Type', 'text/html' )
	const html = fs.readFileSync( 'index.html' )
	res.write( html )
} )

server.listen( 3000, () => console.log( 'Server has started and is listening on port 3000.\nGo to http://localhost:3000' ) )
