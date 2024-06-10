// This file is for setting up and configuring the web server
// 
// # Importing:
// First we import/include other modules this server relies on
// 
// # Configuration:
// Read configuration files and environment variables
// and ensure everything have a value
//
// # Setup:
// Setup the function for performing routing logic
// applicable to every route. Befor passing the
// request along to the correct handler
// 
// # Starting:
// Now once the server is configured we start it
//
// # Shutdown
// A running server might get a message from the host
// system, telling it to stop or pause ++
// So the server is not forcefully killed
// we listen for those and obeys


// ==========================================================
// # Importing
// ==========================================================
import * as http from 'node:http'
import { logger } from './services/logger.js'
import { routes } from './controllers/routes.js'
import { weatherReporter } from './services/weatherReporter.js'


// ==========================================================
// # Configuration
// ==========================================================
const PROTOCOL = "http"
const HOST = process.env.HOST
const PORT = process.env.PORT ?? 80


// ==========================================================
// # Setup
// ==========================================================
const server = http.createServer((request, response) => {
  // Get the parts from the message relevant for routing
  const path = request.url
  const method = (request.method || "GET")
  const handler = routes[path][method]

  logger.info("recived request", {
    path,
    method: request.method,
  })

  
  if (!handler) {
    // If we don't have a handler registered
    // return a 404 Not found message
    logger.warning("Request to non existing resource", {
      path,
      method: request.method,
    })

    response
      .writeHead(404)
      .end()
    
  } else {
    // We have a handler registered

    // Setup the request context
    const context = {
      logger,
      weatherReporter,
    }

    // Set header to allow:
    // Cross Origin Resource Sharing (CORS)
    response.setHeader(
      'Access-Control-Allow-Origin', '*'
    )

    // Forward the request to the handler
    handler(request, response, context)
  }
})


// ==========================================================
// # Starting
// ==========================================================
server.addListener("listening", () => {
  logger.info(`Server started listening on ${PROTOCOL}://${HOST}:${PORT}`)
})
server.listen(PORT, HOST)


// ==========================================================
// # Shutdown
// ==========================================================
const shutdown = (signal) => {
  /** Time to wait before forcefully shutting down */
  const timeoutTime = 3000
  logger.info(`Recieved signal: ${signal}. Closing server`)

  server.close(() => process.exit(0));
  
  // If the server is taking to long to shutdown
  // forcefully shutdown
  setTimeout(() => {
    logger.error(`Server taking to long. Forcefully closing`)
    process.exit(1)
  }, timeoutTime)
}

// These are the main signals the host system might send to us
// more complete list: https://en.wikipedia.org/wiki/Signal_(IPC)#POSIX_signals
process.addListener("SIGINT", shutdown)
process.addListener("SIGTERM", shutdown)
