const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5080/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      message = body.message || body.title || message
    } catch { /* non-JSON error */ }
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

export const getUsers = () => request('/users')
export const createUser = (user) => request('/users', { method: 'POST', body: JSON.stringify(user) })
export const updateUser = (id, user) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) })
export const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' })
