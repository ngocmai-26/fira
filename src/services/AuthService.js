import { API_KEY_NAME, AUTH_KEY_NAME } from "../constants/api";

export const loadTokenFromStorage = () => getValueByKey(API_KEY_NAME);
export const removeTokenFromStorage = () => removeWithKey(API_KEY_NAME);
export const loadAuthInfoFromStorage = () => getValueByKey(AUTH_KEY_NAME);
export const removeAuthInfoFromStorage = () => removeWithKey(AUTH_KEY_NAME);
export const setToken = (token) => setValueWithKey(API_KEY_NAME, token);
export const setAuthInfo = (info) => setValueWithKey(AUTH_KEY_NAME, info);

export const getValueByKey = (key) => localStorage.getItem(key);
export const setValueWithKey = (key, val) => localStorage.setItem(key, val);
export const removeWithKey = (key) => localStorage.removeItem(key);

export const dataToBase64 = (data) => {
  return btoa(JSON.stringify(data));
};
export const base64ToData = (base64Str) => {
  return JSON.parse(atob(base64Str));
};
export const delaySync = async (seconds) => {
  await new Promise((res) => setTimeout(() => res(), seconds * 1000));
};
