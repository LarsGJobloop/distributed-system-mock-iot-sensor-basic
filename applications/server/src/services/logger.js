const persist = (str) => {
  process.stdout.write(str + "\n", "utf-8")
}

const log = (persist, type, message, context) => {
  const log = {
    type,
    message,
    context,
    timeStamp: new Date().toISOString(),
  }

  persist(JSON.stringify(log))
}

export const logger = {
  /**
   * @param {string} message 
   * @param {Record<string, any>} context
   */
  info: (message, context) => log(persist, "info", message, context),
  /**
   * @param {string} message 
   * @param {Record<string, any>} context
   */
  warning: (message, context) => log(persist, "warning", message, context),
  /**
   * @param {string} message 
   * @param {Record<string, any>} context
   */
  error: (message, context) => log(persist, "error", message, context),
}
