export const setToken = (token: string, rememberMe = false) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
};

export const clearToken = () => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
};

export const storeProfileImage = (imageUrl: string) => {
  localStorage.setItem('profileImage', imageUrl);
};

export const getProfileImage = () => {
  return localStorage.getItem('profileImage');
};

export const isAuthenticated = () => {
  return !!getToken();
};