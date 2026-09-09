export const getAuthToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('bidzo_user'));
    return user?.token || null;
  } catch {
    return null;
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred with the API');
  }

  return data;
};
