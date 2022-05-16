function generateApiUrl(path, params) {
  const url = new URL(`/api${path}`, import.meta.env.VITE_API_URL)
  if (params) {
    Object.entries(params).forEach(([key, param]) => {
      if (param) {
        url.searchParams.append(key, param)
      }
    })
  }
  return url.toString()
}

export function getNews({ topic = '', ...rest } = {}) {
  return fetch(generateApiUrl(`/news/${topic}`, rest))
    .then(async (response) => {
      const result = response.json()
      if (response.ok) {
        return result
      }
      throw await result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}
