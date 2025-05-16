// utils/auth.ts

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
