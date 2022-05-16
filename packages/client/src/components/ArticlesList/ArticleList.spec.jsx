import { describe, expect, it } from 'vitest'
import { renderWithPagination } from '../../../test/utils'
import { mockedNews } from '../../api/news.mock'
import ArticlesList from './ArticlesList'

const articles = mockedNews.articles

describe('ArticlesList', () => {
  it('should render', () => {
    const { baseElement } = renderWithPagination(<ArticlesList articles={articles} />)
    expect(baseElement).toMatchSnapshot()
  })
  it('should render without params', () => {
    const { baseElement } = renderWithPagination(<ArticlesList />)
    expect(baseElement).toMatchSnapshot()
  })
})
