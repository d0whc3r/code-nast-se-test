import ArticleCard from '../ArticleCard/ArticleCard'
import Pagination from '../Pagination/Pagination'
import './ArticlesList.styles.css'

function ArticlesList({ articles }) {

  const articleId = (article) => `${article.source.name}-${article.author}-${article.title}`

  return (
    <>
      <section className="list">
        {articles?.map((article) => <ArticleCard key={articleId(article)} article={article} />)}
      </section>
      <Pagination />
    </>
  )
}

export default ArticlesList
