import { useEffect, useState } from 'react'
import { getNews } from '../../api'
import { usePagination } from '../../context/Pagination.context'
import ArticlesList from '../ArticlesList/ArticlesList'
import Loading from '../Loading/Loading'
import SearchForm from '../SearchForm/SearchForm'

function News() {
  const [news, setNews] = useState(null)
  const [searchParams, setSearchParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { state, dispatch } = usePagination()

  const loadNews = (params = undefined) => {
    setLoading(true)
    setError(null)
    getNews({ ...searchParams, ...params })
      .then((data) => {
        const { page, pageSize, totalPages } = data
        setNews(data)
        dispatch({ type: 'SET_INFO', payload: { page, pageSize, totalPages } })
      })
      .catch((err) => setError(err.error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadNews()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    loadNews({ page: state.page })
  }, [state.page])

  const searchHandle = (params) => {
    setSearchParams(params)
    loadNews(params)
  }

  return (
    <div className="w-full">
      <section className="md:sticky md:inset-x-0 md:top-0 md:left-0 md:bg-white md:z-20 md:h-44 px-8">
        <SearchForm onSearch={searchHandle} />
      </section>
      <div className="px-8">
        {error ? (
          <div data-testid="error" className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            {loading ? (
              <div data-testid="loading">
                <Loading />
              </div>
            ) : (
              <div data-testid="articles">
                <ArticlesList articles={news?.articles} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default News
