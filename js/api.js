const API_BASE = window.location.port === '5173' ? 'http://localhost:5000/api' : '/api'

async function request(path, options = {}) {
  const opts = { credentials: 'include', ...options, headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) } }
  const response = await fetch(`${API_BASE}${path}`, opts)
  const text = await response.text()
  let data = {}
  try { data = text ? JSON.parse(text) : {} } catch { data = { error: text || 'Request failed' } }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data
}

export const api = {
  get: path => request(path),
  post: (path, body) => request(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: path => request(path, { method: 'DELETE' }),
  register: body => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: body => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
}
