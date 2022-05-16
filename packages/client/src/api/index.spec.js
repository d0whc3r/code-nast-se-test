import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getNews } from './index'
import { mockedNews } from './news.mock'

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(mockedNews),
})

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should execute getNews without params', async () => {
    await getNews()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/news/')
  })
  it('should execute getNews with a topic', async () => {
    await getNews({ topic: 'mock-topic' })
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/news/mock-topic')
  })
  it('should execute getNews with a topic and other params', async () => {
    await getNews({ topic: 'mock-topic', page: 2, pageSize: 10 })
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/news/mock-topic?page=2&pageSize=10')
  })
  it('should execute getNews without topic but with other params', async () => {
    await getNews({ page: 2, pageSize: 10 })
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/news/?page=2&pageSize=10')
  })
  it('should execute getNews with server error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'mock-error' }),
    })
    try {
      await getNews()
    } catch (error) {
      expect(error.error).toEqual('mock-error')
    }
  })
  it('should execute getNews with api error', async () => {
    global.fetch = vi.fn().mockRejectedValue({
      error: 'mock-error',
    })
    try {
      await getNews()
    } catch (error) {
      expect(error.error).toEqual('mock-error')
    }
  })
})
