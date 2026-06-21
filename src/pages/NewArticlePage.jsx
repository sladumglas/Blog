import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm.jsx';
import { createArticle } from '../api/articlesApi.js';
import { useAuth } from '../context/useAuth.js';

export default function NewArticlePage() {
  const [serverError, setServerError] = useState('');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      setServerError('');
      setIsSubmittingForm(true);

      const tagList = formData.tags
        ? formData.tags.split(' ').filter((tag) => tag.trim() !== '')
        : [];

      const data = await createArticle(
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
      setServerError('Не удалось создать статью');
    } finally {
      setIsSubmittingForm(false);
    }
  }

  return (
    <ArticleForm
      title="Create new article"
      defaultValues={{
        title: '',
        description: '',
        body: '',
        tags: '',
      }}
      onSubmit={onSubmit}
      isSubmittingForm={isSubmittingForm}
      serverError={serverError}
    />
  );
}