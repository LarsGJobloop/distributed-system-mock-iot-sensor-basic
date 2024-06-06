import * as http from 'node:http'
import { logger } from './services/logger.js'
import { routes } from './controllers/routes.js'


// Setup configuration
const PROTOCOL = "http"
const HOST = process.env.HOST
const PORT = process.env.PORT ?? 80

const reports = []

// Setup Server
const server = http.createServer((request, response) => {
  const context = {
    logger,
    reports: {
      getAll: async () => [...reports],
      getLatest: async () => reports[reports.length - 1],
      push: async (newReport) => reports.push(newReport),
    }
  }

  const path = request.url
  const method = (request.method || "GET").toLowerCase()
  const handler = routes[path][method]

  logger.info("recived request", {
    path,
    method: request.method,
  })

  response.setHeader(
    // Allow Cross Origin Resource Sharing (CORS)
    'Access-Control-Allow-Origin', '*'
  )

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
