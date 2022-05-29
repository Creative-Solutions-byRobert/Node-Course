const http = require( 'http' )

const routes = require('./router')

const server = http.createServer(routes)
				.listen( 3000, () => console.log( 'Server has started and is listening on port 3000.\nGo to http://localhost:3000' ) )
