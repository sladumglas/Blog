import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/articles" />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
      {
        path: 'articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);