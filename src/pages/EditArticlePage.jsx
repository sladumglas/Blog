import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm.jsx';
import { getArticle, updateArticle } from '../api/articlesApi.js';
import { useAuth } from '../context/useAuth.js';

export default function EditArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);

        const data = await getArticle(slug);

        setArticle(data.article);
      } catch {
        setServerError('Не удалось загрузить статью');
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  async function onSubmit(formData) {
    try {
      setServerError('');
      setIsSubmittingForm(true);

      const tagList = formData.tags
        ? formData.tags.split(' ').filter((tag) => tag.trim() !== '')
        : [];

      const data = await updateArticle(
        slug,
        {
          title: formData.title,
          description: formData.description,
          body: formData.body,
          tagList,
        },
        token
      );

      navigate(`/articles/${data.article.slug}`);
    } catch {
      setServerError('Не удалось обновить статью');
    } finally {
      setIsSubmittingForm(false);
    }
  }

  if (isLoading) {
    return <p className="container">Загрузка статьи...</p>;
  }

  if (!article) {
    return <p className="container">{serverError}</p>;
  }

  return (
    <ArticleForm
      title="Edit article"
      defaultValues={{
        title: article.title,
        description: article.description,
        body: article.body,
        tags: article.tagList.join(' '),
      }}
      onSubmit={onSubmit}
      isSubmittingForm={isSubmittingForm}
      serverError={serverError}
    />
  );
}