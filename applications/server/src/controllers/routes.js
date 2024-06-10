/// <reference path="../../../../system-models/weather-api.d.ts" />

import { IncomingMessage, ServerResponse } from "node:http"
import { createWeatherReport } from '../domain/createWeatherReport.js'
import { parseJsonStream } from '../utilities/parseJsonStream.js'
import { toWeatherMeasurement } from "../domain/toWeatherMeasurement.js"

/**
 * The shape/type of the context object
 * 
 * @typedef {{
 *  logger: typeof import("../services/logger.js")["logger"];
 *  weatherReporter: {
 *    getAll: () => Promise<WeatherReport[]>,
 *    getLatest: () => Promise<WeatherReport>,
 *    push: (newReport: WeatherReport) => Promise<void>,
 *  };
 * }} RequestContext
 */

/**
 * The shape/type of a Request handler function
 * 
 * @typedef {(
 *   request: IncomingMessage,
 *   response: ServerResponse<IncomingMessage> & {req: IncomingMessage},
 *   context: RequestContext
 * ) => void } RequestHandler
 */

/**
 * Handler for returning the latest report
 * 
 * @type {RequestHandler}
 */
const getLatest = async (request, response, context) => {
  // Fetch the data from the service
  const data = JSON.stringify(await context.weatherReporter.getLatest())

  // Return the response along with type information
  response
    .writeHead(200, {
      "Content-Type": "application/json"
    })
    .end(data)
}

/**
 * Handler responsible for returning all the reports
 * 
 * @type {RequestHandler}
 */
const getAll = async (request, response, context) => {
  // Fetch the data from the service
  const data = JSON.stringify(await context.weatherReporter.getAll())

  // Return the response along with type information
  response
    .writeHead(200, {
      "Content-Type": "application/json"
    })
    .end(data)
}

/**
 * Handles storing incomming messages
 * 
 * @type {RequestHandler}
 */
const postNew = async (request, response, context) => {
  // Convert from Web format (JSON) to JavaScript object
  const payload = await parseJsonStream(request)
  context.logger.info("request body", {body: payload})

  
  // Validate incoming object
  const report = toWeatherMeasurement(payload)
  if (!report) {
    // If malformed, return error
    context.logger.warning("malformed request", {body: report})

    response
      .writeHead(400)
      .end()

  
  } else {
    // If fine, perform logic
    const newReport = createWeatherReport(report)
    context.weatherReporter.push(newReport)
    context.logger.info("registered new report", {report: newReport})
  
    // return ok
    response
      .writeHead(200)
      .end()
  }
}

/**
 * The routing table for the API
 * contains a map from paths to handlers
 * 
 * @type {Record<string,
 *  Record<
 *    "GET" | "POST",
 *    RequestHandler
 *  >>
 * }
 */
export const routes = {
  "/api/v1/weather": {
    GET: getAll,
    POST: postNew,
  },
  "/api/v1/weather/latest": {
    GET: getLatest,
  },
}
