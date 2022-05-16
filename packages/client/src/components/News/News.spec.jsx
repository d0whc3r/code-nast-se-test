import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithPagination } from '../../../test/utils'
import { getNews } from '../../api/index'
import { mockedNews } from '../../api/news.mock'
import News from './News'

vi.mock('../../api', () => {
  return {
    getNews: vi.fn(),
  }
})

describe('News', () => {
  it('should render', async () => {
    getNews.mockResolvedValue(mockedNews)
    const { baseElement } = renderWithPagination(<News />)
    expect(baseElement).toMatchSnapshot()
    await waitFor(() => {
      expect(screen.getByTestId('articles')).toBeInTheDocument()
    })
    expect(baseElement).toMatchSnapshot()
  })
  it('should execute handleSearch', async () => {
    getNews.mockResolvedValue(mockedNews)
    const { baseElement } = renderWithPagination(<News />)
    const searchButton = screen.getByText('Search')
    fireEvent.click(searchButton)
    await waitFor(() => {
      expect(screen.getByTestId('articles')).toBeInTheDocument()
    })
    expect(baseElement).toMatchSnapshot()
  })
  it('should render with error', async () => {
    getNews.mockRejectedValue({ error: 'mock-error' })
    const { baseElement } = renderWithPagination(<News />)
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
    expect(baseElement).toMatchSnapshot()
  })
})
