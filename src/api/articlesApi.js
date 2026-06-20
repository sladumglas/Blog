const API_URL = 'https://realworld.habsidev.com/api';

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