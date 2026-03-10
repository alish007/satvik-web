const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchWithAuth(endpoint, options = {}) {
  const { supabase } = await import('./supabase'); // dynamic import if needed
  const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  products: {
    getAll: (category) => fetchWithAuth(`/products${category && category !== 'All' ? `?category=${category}` : ''}`),
    getBySlug: (slug) => fetchWithAuth(`/products/${slug}`),
    getCategories: () => fetchWithAuth('/products/categories'),
  },
  users: {
    getMe: () => fetchWithAuth('/users/me'),
    updateMe: (data) => fetchWithAuth('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),
    getAddresses: () => fetchWithAuth('/users/me/addresses'),
    addAddress: (data) => fetchWithAuth('/users/me/addresses', { method: 'POST', body: JSON.stringify(data) }),
  },
  cart: {
    get: () => fetchWithAuth('/cart'),
    addItem: (productId, quantity) => fetchWithAuth('/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
    removeItem: (itemId) => fetchWithAuth(`/cart/items/${itemId}`, { method: 'DELETE' }),
  },
  orders: {
    checkout: (addressId) => fetchWithAuth('/orders/checkout', { method: 'POST', body: JSON.stringify({ addressId }) }),
    getAll: () => fetchWithAuth('/orders'),
    getDetails: (id) => fetchWithAuth(`/orders/${id}`),
  },
  contact: {
    submit: (data) => fetchWithAuth('/contact-submissions', { method: 'POST', body: JSON.stringify(data) }),
  },
  blog: {
    getCategories: () => fetchWithAuth('/blog/categories'),
    getPosts: (category) => fetchWithAuth(`/blog/posts${category && category !== 'All' ? `?category=${category.toLowerCase()}` : ''}`),
    getPost: (slug) => fetchWithAuth(`/blog/posts/${slug}`),
  }
};
