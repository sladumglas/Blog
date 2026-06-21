import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../api/authApi.js';
import { useAuth } from '../context/useAuth.js';

export default function ProfilePage() {
  const [serverError, setServerError] = useState('');
  const { user, token, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    reset({
      username: user.username || '',
      email: user.email || '',
      password: '',
      image: user.image || '',
    });
  }, [user, navigate, reset]);

  async function onSubmit(formData) {
    try {
      setServerError('');

      const userData = {
        username: formData.username,
        email: formData.email,
        image: formData.image,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      const data = await updateUser(userData, token);

      setUser(data.user);
      navigate('/articles');
    } catch (error) {
      if (error.errors) {
        if (error.errors.email) {
          setError('email', {
            message: `Email ${error.errors.email}`,
          });
        }

        if (error.errors.username) {
          setError('username', {
            message: `Username ${error.errors.username}`,
          });
        }

        if (error.errors.image) {
          setError('image', {
            message: `Image ${error.errors.image}`,
          });
        }
      } else {
        setServerError('Ошибка обновления профиля');
      }
    }
  }

  if (!user) {
    return null;
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Profile</h1>

        <label>
          Username
          <input
            type="text"
            {...register('username', {
              required: 'Введите username',
            })}
          />
        </label>
        {errors.username && (
          <p className="field-error">{errors.username.message}</p>
        )}

        <label>
          Email address
          <input
            type="email"
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Введите корректный email',
              },
            })}
          />
        </label>
        {errors.email && <p className="field-error">{errors.email.message}</p>}

        <label>
          New password
          <input
            type="password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Пароль должен быть минимум 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен быть максимум 40 символов',
              },
            })}
          />
        </label>
        {errors.password && (
          <p className="field-error">{errors.password.message}</p>
        )}

        <label>
          Avatar image
          <input
            type="url"
            {...register('image', {
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Введите корректный URL',
              },
            })}
          />
        </label>
        {errors.image && <p className="field-error">{errors.image.message}</p>}

        {serverError && <p className="field-error">{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </form>
    </main>
  );
}