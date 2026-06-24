import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi.js';
import { useAuth } from '../context/useAuth.js';

export default function SignInPage() {
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/articles';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(formData) {
    try {
      setServerError('');

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      login(data.user);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.errors) {
        if (error.errors.email) {
          setError('email', {
            message: `Email ${error.errors.email}`,
          });
        }

        if (error.errors.password) {
          setError('password', {
            message: `Password ${error.errors.password}`,
          });
        }

        if (error.errors['email or password']) {
          setServerError('Email or password is invalid');
        }
      } else {
        setServerError('Ошибка входа');
      }
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>

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
            })}
          />
        </label>
        {errors.password && (
          <p className="field-error">{errors.password.message}</p>
        )}

        {serverError && <p className="field-error">{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          Login
        </button>

        <p>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </form>
    </main>
  );
}