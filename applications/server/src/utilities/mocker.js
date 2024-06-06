/**
 * @param {number} min 
 * @param {number} max 
 */
const randomInRangeDecimal = (min, max) => (Math.random() * (max - min)) + min

/**
 * @param {number} min 
 * @param {number} max 
 */
const randomInRangeInteger = (min, max) => ((Math.random() * (max - min - 1)) + min + 1).toFixed(0)

/**
 * @param {string} min 
 * @param {string} max 
 */
const randomInRangeChar = (min, max) => String.fromCharCode(randomInRangeInteger(min.charCodeAt(0) - 1, max.charCodeAt(0)))

const timeNowIso = () => new Date().toISOString()

const randomCoordinatesIso = () => ({
  lat: [
    `${randomInRangeInteger(-90, 90)}°`,
    `${randomInRangeInteger(0, 59)}′`,
    `${randomInRangeDecimal(0, 59.9999).toFixed(4)}″`,
    `${Math.random() > 0.5 ? 'N' : 'S'}`,
  ].join(""),
  long: [
    `${randomInRangeInteger(-180, 180)}°`,
    `${randomInRangeInteger(0, 59)}′`,
    `${randomInRangeDecimal(0, 59.9999).toFixed(4)}″`,
    `${Math.random() > 0.5 ? 'E' : 'W'}`,
  ].join(""),
  elevation: randomInRangeDecimal(-430, 8848).toFixed(2),
})

/**
 * @param {number[]} sections - The sections specifier for the generated UUID
 */
const uuid = (sections = [8, 4, 4, 4, 12]) => sections
  .map((amount) => Array(amount).fill(null)
    .map(() => Math.random() > 0.5 ? randomInRangeChar("0", "9") : randomInRangeChar("a", "z"))
    .join(""))
  .join("-")

export const mock = {
  /**
   * A random number in the given range
   * @param {number} min 
   * @param {number} max
   */
  randomInRangeDecimal,
  /**
   * A random number in the given range
   * @param {number} min 
   * @param {number} max
   */
  randomInRangeInteger,
  /**
   * A random character between, inclusive
   * @param {string} min 
   * @param {string} max 
   */
  randomInRangeChar,
  /**
   * Gets the current time as an iso string
   */
  timeNowIso,
  /**
   * Gets a random ISO 6709 coordinates object
   */
  randomCoordinatesIso,
  /**
   * Gets uuid string following the format with symbols (0-9) & (a-z)
   * 
   * @param {number[]} sections - The format specifier for the generated UUID
   * @example
   * uuid([8,4,4,4,12]) // => "bf62db60-74fe-4606-a91e-11aab1f31d26"
   * @example
   * uuid([12]) // => "11aab1f31d26"
   */
  uuid,
}
