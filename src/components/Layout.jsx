import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/articles" className="logo">
          Blog Platform
        </Link>
      </header>

      <Outlet />
    </div>
  );
}