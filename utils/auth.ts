// utils/auth.js
export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'admin';
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};