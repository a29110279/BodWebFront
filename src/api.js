import axios from 'axios'

const api = axios.create({
  baseURL: '/', // 走 vite proxy，所以用相對路徑
})

// 每次 request 自動帶上 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default {api}
