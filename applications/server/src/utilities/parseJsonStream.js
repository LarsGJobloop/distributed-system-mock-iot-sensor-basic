/**
 * Takes a stream representing a JSON object and parses
 * it into a JavaScript object
 * 
 * @param {*} stream 
 * @returns 
 */
export const parseJsonStream = async (stream) => {
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
