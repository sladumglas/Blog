import { useEffect, useState } from 'react';
import { getArticles } from '../api/articlesApi.js';
import ArticleCard from '../components/ArticleCard.jsx';
import Pagination from '../components/Pagination.jsx';

const ARTICLES_LIMIT = 5;

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const pagesCount = Math.ceil(articlesCount / ARTICLES_LIMIT);

  return (
    <main className="container">
      <h1>Articles</h1>

      {isLoading && <p>Загрузка статей...</p>}

      {error && <p className="error">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="articles-list">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            pagesCount={pagesCount}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}