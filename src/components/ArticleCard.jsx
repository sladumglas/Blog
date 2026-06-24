import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';
import { getValidTags } from '../utils/tags.js';

export default function ArticleCard({ article }) {
  const [currentArticle, setCurrentArticle] = useState(article);

  const validTags = getValidTags(currentArticle.tagList);

  return (
    <article className="article-card">
      <div className="article-top">
        <div>
          <p className="author">{currentArticle.author.username}</p>
          <p className="date">
            {new Date(currentArticle.createdAt).toLocaleDateString()}
          </p>
        </div>

        <FavoriteButton article={currentArticle} onChange={setCurrentArticle} />
      </div>

      <Link to={`/articles/${currentArticle.slug}`} className="article-title">
        {currentArticle.title}
      </Link>

      <p className="description">{currentArticle.description}</p>

      <div className="tags">
        {validTags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}