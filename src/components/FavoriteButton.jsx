import { useState } from 'react';
import { favoriteArticle, unfavoriteArticle } from '../api/articlesApi.js';
import { useAuth } from '../context/useAuth.js';

export default function FavoriteButton({ article, onChange }) {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (!user || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const data = article.favorited
        ? await unfavoriteArticle(article.slug, token)
        : await favoriteArticle(article.slug, token);

      onChange(data.article);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={article.favorited ? 'like-button active-like' : 'like-button'}
      disabled={!user || isLoading}
      onClick={handleClick}
    >
      ♥ {article.favoritesCount}
    </button>
  );
}