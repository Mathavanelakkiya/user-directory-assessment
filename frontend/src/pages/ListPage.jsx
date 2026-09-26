import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteUser, getUsers } from '../services/api'

export default function ListPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      setUsers(await getUsers())
    } catch (err) {
      setError(err.message || 'Unable to load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
    if (location.state?.success) {
      setToast(location.state.success)
      navigate(location.pathname, { replace: true, state: null })
      const timer = setTimeout(() => setToast(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    setDeletingId(id)
    try {
      await deleteUser(id)
      setUsers(current => current.filter(user => user.id !== id))
    } catch (err) {
      setError(err.message || 'Unable to delete user.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">DIRECTORY</p>
          <h1>Users</h1>
          <p className="subtitle">Manage users stored in the SQLite database.</p>
        </div>
        <button className="button" onClick={loadUsers}>Refresh</button>
      </div>

      {toast && <div className="toast" role="status">✓ {toast}</div>}
      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <div className="state-card"><div className="spinner" /> Loading users...</div>
      ) : users.length === 0 ? (
        <div className="state-card">
          <h3>No users yet</h3>
          <p>Add the first user to populate the directory.</p>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Age</th><th>City</th><th>State</th><th>Pincode</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.pincode}</td>
                    <td><button className="link-danger" disabled={deletingId === user.id} onClick={() => handleDelete(user.id)}>{deletingId === user.id ? 'Deleting...' : 'Delete'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
