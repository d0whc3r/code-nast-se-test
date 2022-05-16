import { generateUrl } from './common.mjs'

describe('Common', () => {
  describe('generateUrl', () => {
    const baseUrl = 'https://newsapi.org'

    it('should generate the correct url without params', () => {
      const url = generateUrl()
      expect(url).toEqual(`${baseUrl}/v2/everything?apiKey=mocked-api-key`)
    })
    it('should generate the correct url with first argument', () => {
      const url = generateUrl({ a: 1, b: 2 })
      expect(url).toEqual(`${baseUrl}/v2/everything?a=1&b=2&apiKey=mocked-api-key`)
    })
    it('should generate the correct url with all arguments', () => {
      const url = generateUrl({ a: 1, b: 2 }, 'sample')
      expect(url).toEqual(`${baseUrl}/sample?a=1&b=2&apiKey=mocked-api-key`)
    })
    it('should generate the correct url using other apikey', () => {
      const url = generateUrl({ a: 1, b: 2, apiKey: 'other-api-key' }, 'sample')
      expect(url).toEqual(`${baseUrl}/sample?a=1&b=2&apiKey=other-api-key`)
    })
  })
})
