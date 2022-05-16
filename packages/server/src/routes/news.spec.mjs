import fetch, { Response } from 'node-fetch'
import { latestNews, newsByTopic } from './news.mjs'

jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch')
  return {
    ...actual,
    __esModule: true,
    default: jest.fn(),
  }
})

const commonParams = {
  page: 1,
  pageSize: 10,
  totalPages: 1,
}

describe('News', () => {
  const baseUrl = 'https://newsapi.org/v2/everything'
  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockImplementation(() => mockRes),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('newsByTopic', () => {
    const mockReq = {
      params: {
        q: 'sample',
      },
    }
    it('should get news by topic', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [{
          source: {
            id: 'abc-news',
            name: 'ABC News',
          },
        }],
      }
      fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)))
      await newsByTopic(mockReq, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?q=sample&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(200)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({ ...mockResponse, ...commonParams })
    })
    it('should get news by topic including query params', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [{
          source: {
            id: 'abc-news',
            name: 'ABC News',
          },
        }],
      }
      fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)))
      await newsByTopic({ ...mockReq, query: { source: 'sample-source' } }, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?q=sample&source=sample-source&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(200)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({ ...mockResponse, ...commonParams })
    })
    it('should return error if fetch fails', async () => {
      fetch.mockRejectedValue(new Error('error'))
      await newsByTopic(mockReq, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?q=sample&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(500)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({
        error: new Error('error'),
      })
    })
    it('should return error if newsapi fails', async () => {
      const mockResponse = {
        status: 'error',
        message: 'error message',
      }
      fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)))
      await newsByTopic(mockReq, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?q=sample&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(500)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({
        error: mockResponse.message,
      })
    })
  })

  describe('latestNews', () => {
    const mockReq = {}
    beforeEach(() => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2022-01-05T00:00:00.000Z'))
    })
    it('should get latest news', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [{
          source: {
            id: 'abc-news',
            name: 'ABC News',
          },
        }],
      }
      fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)))
      await latestNews(mockReq, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?sources=engadget&from=2022-01-04&to=2022-01-05&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(200)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({ ...mockResponse, ...commonParams })
    })
    it('should get latest news including query', async () => {
      const mockResponse = {
        status: 'ok',
        totalResults: 1,
        articles: [{
          source: {
            id: 'abc-news',
            name: 'ABC News',
          },
        }],
      }
      fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)))
      await latestNews({
        ...mockReq,
        query: { sources: 'sample-source' },
      }, mockRes, jest.fn())
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith(`${baseUrl}?sources=sample-source&from=2022-01-04&to=2022-01-05&pageSize=10&apiKey=mocked-api-key`)
      expect(mockRes.status).toBeCalledTimes(1)
      expect(mockRes.status).toBeCalledWith(200)
      expect(mockRes.json).toBeCalledTimes(1)
      expect(mockRes.json).toBeCalledWith({ ...mockResponse, ...commonParams })
    })
  })
})
