import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticle } from '../api/articlesApi.js';

export default function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);
        setError('');

        const data = await getArticle(slug);

        setArticle(data.article);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  return (
    <main className="container">
      <Link to="/articles" className="back-link">
        ← Назад к статьям
      </Link>

      {isLoading && <p>Загрузка статьи...</p>}

      {error && <p className="error">{error}</p>}

      {!isLoading && !error && article && (
        <article className="full-article">
          <h1>{article.title}</h1>

          <p className="author">Автор: {article.author.username}</p>

          <p className="description">{article.description}</p>

          <div className="markdown">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </article>
      )}
    </main>
  );
}