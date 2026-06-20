import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="article-top">
        <div>
          <p className="author">{article.author.username}</p>
          <p className="date">
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button className="like-button" disabled>
          ♥ {article.favoritesCount}
        </button>
      </div>

      <Link to={`/articles/${article.slug}`} className="article-title">
        {article.title}
      </Link>

      <p className="description">{article.description}</p>

      <div className="tags">
        {article.tagList.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}