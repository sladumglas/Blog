import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi.js';
import { useAuth } from '../context/useAuth.js';

export default function SignUpPage() {
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(formData) {
    try {
      setServerError('');

      const data = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      login(data.user);
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
      } else {
        setServerError('Ошибка регистрации');
      }
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create new account</h1>

        <label>
          Username
          <input
            type="text"
            {...register('username', {
              required: 'Введите username',
              minLength: {
                value: 3,
                message: 'Username должен быть минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Username должен быть максимум 20 символов',
              },
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
          Password
          <input
            type="password"
            {...register('password', {
              required: 'Введите пароль',
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
          Repeat Password
          <input
            type="password"
            {...register('repeatPassword', {
              required: 'Повторите пароль',
              validate: (value) =>
                value === getValues('password') || 'Пароли должны совпадать',
            })}
          />
        </label>
        {errors.repeatPassword && (
          <p className="field-error">{errors.repeatPassword.message}</p>
        )}

        <label className="checkbox-label">
          <input
            type="checkbox"
            {...register('agreement', {
              required: 'Нужно согласиться с обработкой данных',
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agreement && (
          <p className="field-error">{errors.agreement.message}</p>
        )}

        {serverError && <p className="field-error">{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          Create
        </button>

        <p>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </form>
    </main>
  );
}