const reports = []

export const weatherReporter = {
  getAll: async () => [...reports],
  getLatest: async () => reports[reports.length - 1],
  push: async (newReport) => reports.push(newReport),
}
