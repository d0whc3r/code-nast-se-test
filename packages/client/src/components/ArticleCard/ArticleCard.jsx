import './ArticleCard.styles.css'

function ArticleCard({ article }) {
  const showDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <a href={article.url} target="_blank" className="card">
      <header>
        <h2 className="title">{article.title}</h2>
      </header>
      <img className="image" src={article.urlToImage} alt={article.title} />
      <p>{article.content}</p>
      <p className="published">{showDateTime(article.publishedAt)}</p>
    </a>
  )
}

export default ArticleCard
