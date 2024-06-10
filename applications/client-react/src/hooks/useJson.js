import { useEffect } from "react"
import { useState } from "react"

const defaultOptions = { refreshInterval: 10}

export function useJson(url, fetchOptions) {
  const options = {
    ...defaultOptions,
    ...fetchOptions,
  }
  
  const [data, setReport] = useState(null)
  const [error, setError] = useState(null)
  const isLoading = !data && !error

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setReport(data)
      } catch (error) {
        setError(error)
      }
    }

    getData()

    const id = setInterval(getData, options.refreshInterval  * 1000)

    return () => clearInterval(id)
  }, [url, options.refreshInterval])

  return {
    data,
    error,
    isLoading,
  }
}
