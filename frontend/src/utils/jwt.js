/* eslint-disable no-unused-vars */
export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    return null;
  }
}
