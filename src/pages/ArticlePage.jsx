import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { deleteArticle, getArticle } from '../api/articlesApi.js';
import { useAuth } from '../context/useAuth.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { getValidTags } from '../utils/tags.js';

export default function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const { user, token } = useAuth();
  const navigate = useNavigate();

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

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteArticle(slug, token);

      navigate('/articles');
    } catch {
      setError('Не удалось удалить статью');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  }

  const isAuthor = user && article && user.username === article.author.username;
  const validTags = article ? getValidTags(article.tagList) : [];

  return (
    <main className="container">
      <Link to="/articles" className="back-link">
        ← Назад к статьям
      </Link>

      {isLoading && <p>Загрузка статьи...</p>}

      {error && <p className="error">{error}</p>}

      {!isLoading && !error && article && (
        <article className="full-article">
          <div className="article-page-header">
            <div>
              <h1>{article.title}</h1>

              <p className="author">Автор: {article.author.username}</p>

              <FavoriteButton article={article} onChange={setArticle} />
            </div>

            {isAuthor && (
              <div className="article-actions">
                <Link
                  to={`/articles/${article.slug}/edit`}
                  className="edit-button"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="description">{article.description}</p>

          {validTags.length > 0 && (
            <div className="tags">
              {validTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="markdown">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </article>
      )}

      {isModalOpen && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          isDeleting={isDeleting}
        />
      )}
    </main>
  );
}