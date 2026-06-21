import { useForm } from 'react-hook-form';

export default function ArticleForm({
  title,
  defaultValues,
  onSubmit,
  isSubmittingForm,
  serverError,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  return (
    <main className="auth-container article-form-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>{title}</h1>

        <label>
          Title
          <input
            type="text"
            {...register('title', {
              required: 'Введите title',
            })}
          />
        </label>
        {errors.title && <p className="field-error">{errors.title.message}</p>}

        <label>
          Description
          <input
            type="text"
            {...register('description', {
              required: 'Введите description',
            })}
          />
        </label>
        {errors.description && (
          <p className="field-error">{errors.description.message}</p>
        )}

        <label>
          Body
          <textarea
            rows="8"
            {...register('body', {
              required: 'Введите body',
            })}
          />
        </label>
        {errors.body && <p className="field-error">{errors.body.message}</p>}

        <label>
          Tags
          <input
            type="text"
            placeholder="tag1 tag2 tag3"
            {...register('tags')}
          />
        </label>

        {serverError && <p className="field-error">{serverError}</p>}

        <button type="submit" disabled={isSubmitting || isSubmittingForm}>
          Send
        </button>
      </form>
    </main>
  );
}