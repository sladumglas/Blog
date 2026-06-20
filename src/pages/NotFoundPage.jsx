import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="container">
      <h1>404</h1>
      <p>Страницу украли </p>

      <Link to="/articles" className="back-link">
        Перейти к статьям
      </Link>
    </main>
  );
}