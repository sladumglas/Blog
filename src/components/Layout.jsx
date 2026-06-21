import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/articles');
  }

  return (
    <div className="app">
      <header className="header">
        <Link to="/articles" className="logo">
          Blog Platform
        </Link>

        <nav className="header-nav">
          {user ? (
            <>
              <Link to="/new-article" className="nav-link register-link">
                New Article
              </Link>

              <Link to="/profile" className="user-link">
                {user.image && (
                  <img src={user.image} alt={user.username} className="avatar" />
                )}

                <span>{user.username}</span>
              </Link>

              <button onClick={handleLogout} className="logout-button">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="nav-link">
                Sign In
              </Link>

              <Link to="/sign-up" className="nav-link register-link">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <Outlet />
    </div>
  );
}