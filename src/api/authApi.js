const API_URL = 'https://realworld.habsida.net/api';

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function updateUser(userData, token) {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}