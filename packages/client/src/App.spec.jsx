import { describe, expect, it, vi } from 'vitest'
import { getNews } from './api/index'
import { mockedNews } from './api/news.mock'
import App from './App'
import { renderWithPagination, screen } from '../test/utils'

vi.mock('./api', () => {
  return {
    getNews: vi.fn(),
  }
})

describe('Simple working test', () => {
  it('the title is visible', () => {
    getNews.mockResolvedValue(mockedNews)
    const { baseElement } = renderWithPagination(<App />)
    expect(screen.getByText(/News board/i)).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
})
