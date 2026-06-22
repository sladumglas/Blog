import { Link } from 'react-router-dom';
import { useState } from 'react';
import { favoriteArticle, unfavoriteArticle } from '../api/articlesApi.js';
import { useAuth } from '../context/useAuth.js';

export default function ArticleCard({ article }) {
  const { user, token } = useAuth();

  const [isFavorited, setIsFavorited] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  async function handleLikeClick() {
    if (!user) {
      return;
    }

    try {
      setIsLikeLoading(true);

      const data = isFavorited
        ? await unfavoriteArticle(article.slug, token)
        : await favoriteArticle(article.slug, token);

      setIsFavorited(data.article.favorited);
      setFavoritesCount(data.article.favoritesCount);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLikeLoading(false);
    }
  }

  return (
    <article className="article-card">
      <div className="article-top">
        <div>
          <p className="author">{article.author.username}</p>
          <p className="date">
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          className={isFavorited ? 'like-button active-like' : 'like-button'}
          disabled={!user || isLikeLoading}
          onClick={handleLikeClick}
          type="button"
        >
          ♥ {favoritesCount}
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