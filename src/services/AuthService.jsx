const tokenKey = "authToken";

// Lưu token vào localStorage
export function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

// Lấy token từ localStorage
export function getToken() {
  return localStorage.getItem(tokenKey);
}

// Xóa token từ localStorage
export function removeToken() {
  localStorage.removeItem(tokenKey);
}

// Kiểm tra xem token có tồn tại hay không
export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

// Decode token để lấy thông tin payload
export function decodeToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

// Lấy thông tin người dùng từ token
export function getUserInfo() {
  const decodedToken = decodeToken();
  if (!decodedToken) {
    return null;
  }
  return decodedToken;
}
