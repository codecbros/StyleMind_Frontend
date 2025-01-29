import { useState } from 'react'

export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  function startLoading() {
    setIsLoading(true)
  }

  function stopLoading() {
    setIsLoading(false)
  }

  return { isLoading, startLoading, stopLoading }
}
