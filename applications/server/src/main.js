/// <reference path="./models/weather-api.d.ts" />

import * as http from 'node:http'
import { logger } from './services/logger.js'
import { routes } from './controllers/routes.js'


// Setup configuration
const PROTOCOL = "http"
const HOST = process.env.HOST
const PORT = process.env.PORT ?? 80

// Setup Server
const server = http.createServer((request, response) => {
  const context = {
    logger,
  }

  const path = request.url
  const handler = routes[path]

  logger.info("recived request", {
    path,
    method: request.method,
  })

  if (!handler) {
    logger.warning("request to non existing resource", {
      path,
      method: request.method,
    })
    response
      .writeHead(404)
      .end()
  } else {
    handler(request, response, context)
  }
})

// Start Server
server.listen(PORT, HOST)
server.addListener("listening", () => {
  logger.info(`Server started listening on ${PROTOCOL}://${HOST}:${PORT}`)
})

// Listen for shutdown signals
const shutdown = (signal) => {
  const timeoutTime = 3000
  logger.info(`Recieved signal: ${signal}. Closing server`)
  server.close(() => {
    process.exit()
  });
  
  setTimeout(() => {
    logger.error(`Server taking to long. Force closing`)
    process.exit(1)
  }, timeoutTime)
}

process.addListener("SIGINT", shutdown)
process.addListener("SIGTERM", shutdown)
