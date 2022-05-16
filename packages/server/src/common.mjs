const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL

/**
 * Generate the newsapi url based on params
 * @param params {Record<string, string>}
 * @param path {string}
 * @returns {string}
 */
export function generateUrl(params = {}, path = 'v2/everything') {
  const url = new URL(path, BASE_URL)
  if (!params?.apiKey) {
    params.apiKey = API_KEY
  }
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  return url.toString()
}
