const API_URL = 'https://realworld.habsida.net/api';

export async function getArticles(page, limit) {
  const offset = (page - 1) * limit;

  const response = await fetch(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Не удалось загрузить статьи');
  }

  return response.json();
}

export async function getArticle(slug) {
  const response = await fetch(`${API_URL}/articles/${slug}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить статью');
  }

  return response.json();
}

export async function createArticle(articleData, token) {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: articleData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function updateArticle(slug, articleData, token) {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: articleData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function deleteArticle(slug, token) {
  const response = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Не удалось удалить статью');
  }
}