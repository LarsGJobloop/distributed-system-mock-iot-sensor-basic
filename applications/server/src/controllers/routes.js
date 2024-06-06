/// <reference path="../models/weather-api.d.ts" />

import { IncomingMessage, ServerResponse } from "node:http"

const parseJsonStream = async (stream) => {
  return new Promise((resolve, reject) => {
    let data = "";
  
    stream.on("data", (chunk) => {
      data += chunk
    })
    stream.on("end", () => {
      try {
        const json = JSON.parse(data)
        resolve(json)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {any} newData 
 * @returns {WeatherReport}
 */
const createReport = (newData) => {
  const temperatureC = newData.measurments["temperature"]
  if (!temperatureC) {
    throw new Error("missing temperature measurements")
  }

  return {
    id: newData.sensorId,
    location: newData.location,
    temperatureC,
    timestamp: newData.timestamp,
  }
}

/**
 * @typedef {{
 *  logger: typeof import("../services/logger.js")["logger"];
 *  reports: {
 *    getAll: () => Promise<WeatherReport[]>,
 *    getLatest: () => Promise<WeatherReport>,
 *    push: (newReport: WeatherReport) => Promise<void>,
 *  };
 * }} RequestContext
 */

/**
 * @typedef {(
 *   request: IncomingMessage,
 *   response: ServerResponse<IncomingMessage> & {req: IncomingMessage},
 *   context: RequestContext
 * ) => void } RequestHandler
 */

/**
 * @type {Record<string,
 *  Record<
 *    "get" | "post",
 *    RequestHandler
 *  >>
 * }
 */
export const routes = {
  "/api/v1/weather/latest": {
    get: async (request, response, context) => {
      const data = JSON.stringify(await context.reports.getLatest())

      response
        .writeHead(200, {
          "Content-Type": "application/json"
        })
        .end(data)
    },
  },
  "/api/v1/weather": {
    get: async (request, response, context) => {
      const data = JSON.stringify(await context.reports.getAll())

      response
        .writeHead(200, {
          "Content-Type": "application/json"
        })
        .end(data)
    },
    post: async (request, response, context) => {
      const payload = await parseJsonStream(request)
      context.logger.info("request body", {body: payload})
      
      const newReport = createReport(payload)
      context.reports.push(newReport)
      context.logger.info("registered new report", {report: newReport})

      response
        .writeHead(200)
        .end()
    },
  } 
}
