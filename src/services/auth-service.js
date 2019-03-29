import http from './base-http-service';

const authenticate = (user) => http.post('/authenticate', user)
  .then(response => response.data);

const register = (user) => http.post('/register', user)
  .then(response => response.data);

const getUser = () => http.get('/profile')
  .then(response => response.data);

const editUser = (user) => http.put('/profile', user)
  .then(response => response.data);

const logout = () => http.get('/logout')
  .then(response => response.data);

export default {
  authenticate,
  register,
  getUser,
  editUser,
  logout
}