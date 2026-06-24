import { useEffect, useState } from 'react';
import { getArticles } from '../api/articlesApi.js';
import ArticleCard from '../components/ArticleCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { hasValidTags } from '../utils/tags.js';

const ARTICLES_LIMIT = 5;

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOnlyWithTags, setIsOnlyWithTags] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const pagesCount = Math.ceil(articlesCount / ARTICLES_LIMIT);

  const visibleArticles = isOnlyWithTags
    ? articles.filter(hasValidTags)
    : articles;

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError('');

        const data = await getArticles(currentPage, ARTICLES_LIMIT);

        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, [currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleToggleTagsFilter() {
    setIsOnlyWithTags(!isOnlyWithTags);
  }

  return (
    <main className="container">
      <h1>Articles</h1>

      <div className="filter-panel">
        <button
          type="button"
          className={isOnlyWithTags ? 'filter-button active-filter' : 'filter-button'}
          onClick={handleToggleTagsFilter}
        >
          {isOnlyWithTags
            ? 'Показать все статьи'
            : 'Показать только статьи с тегами'}
        </button>
      </div>

      {isLoading && <p>Загрузка статей...</p>}

      {error && <p className="error">{error}</p>}

      {!isLoading && !error && visibleArticles.length === 0 && (
        <p>На этой странице нет подходящих статей.</p>
      )}

      {!isLoading && !error && visibleArticles.length > 0 && (
        <div className="articles-list">
          {visibleArticles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      )}

      {!isLoading && !error && pagesCount > 1 && (
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}