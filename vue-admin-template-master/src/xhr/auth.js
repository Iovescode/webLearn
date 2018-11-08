import { getString, setString, remove } from './storage'

export function getToken(key) {
  if (key !== undefined && key !== null) {
    return getString(key)
  } else {
    return getString('access_token')
  }
}

export function setToken(key, token) {
  setString(key, token)
}
export function removeToken(key) {
  if (key !== undefined && key !== null) {
    remove(key)
  } else {
    remove('access_token')
    remove('auth_x')
  }
}
