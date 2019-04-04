import http from './base-http-service';
const CURRENT_USER_KEY = 'current-user';
let user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')

const authenticate = (user) => http.post('/authenticate', user)
  .then(response => {
    user = response.data;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  });

const register = (user) => http.post('/register', user)
  .then(response => response.data);

const getUser = () => http.get('/profile')
  .then(response => response.data);

const editUser = (user) => http.put('/profile', user)
  .then(response => response.data);
 
const logout = () => http.get('/logout')
.then(response => {
  user = {};
  localStorage.removeItem(CURRENT_USER_KEY);
  return response.data
});

export default {
  authenticate,
  register,
  getUser,
  editUser,
  logout
}