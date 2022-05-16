import { describe, expect, it } from 'vitest'
import { render } from '../../../test/utils'
import { mockedNews } from '../../api/news.mock'
import ArticleCard from './ArticleCard'

const article = mockedNews.articles[0]

describe('ArticleCard', () => {
  it('should render', () => {
    const { baseElement } = render(<ArticleCard article={article} />)
    expect(baseElement).toMatchSnapshot()
  })
})
