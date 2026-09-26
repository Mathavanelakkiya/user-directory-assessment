import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../services/api'

const initialForm = { name: '', age: '', city: '', state: '', pincode: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  else if (form.name.trim().length < 2 || form.name.trim().length > 100) errors.name = 'Name must be 2–100 characters.'

  if (form.age === '') errors.age = 'Age is required.'
  else if (!Number.isInteger(Number(form.age)) || Number(form.age) < 0 || Number(form.age) > 120) errors.age = 'Age must be an integer from 0 to 120.'

  if (!form.city.trim()) errors.city = 'City is required.'
  if (!form.state.trim()) errors.state = 'State is required.'
  if (!form.pincode.trim()) errors.pincode = 'Pincode is required.'
  else if (form.pincode.trim().length < 4 || form.pincode.trim().length > 10) errors.pincode = 'Pincode must be 4–10 characters.'
  return errors
}

export default function AddPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const update = (field, value) => {
    setForm(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    setApiError('')
    if (Object.keys(validationErrors).length) return

    setSaving(true)
    try {
      await createUser({ ...form, age: Number(form.age) })
      navigate('/users', { state: { success: 'User created successfully.' } })
    } catch (err) {
      setApiError(err.message || 'Unable to create user.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="form-section">
      <div className="page-heading"><div><p className="eyebrow">DIRECTORY</p><h1>Add User</h1><p className="subtitle">Create a new directory entry.</p></div></div>
      {apiError && <div className="alert error">{apiError}</div>}
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <Field label="Name" error={errors.name}><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Arjun Kumar" /></Field>
        <Field label="Age" error={errors.age}><input type="number" min="0" max="120" value={form.age} onChange={e => update('age', e.target.value)} placeholder="e.g. 30" /></Field>
        <Field label="City" error={errors.city}><input value={form.city} onChange={e => update('city', e.target.value)} placeholder="e.g. Chennai" /></Field>
        <Field label="State" error={errors.state}><input value={form.state} onChange={e => update('state', e.target.value)} placeholder="e.g. Tamil Nadu" /></Field>
        <Field label="Pincode" error={errors.pincode}><input value={form.pincode} onChange={e => update('pincode', e.target.value)} placeholder="e.g. 600001" /></Field>
        <div className="form-actions"><button type="submit" className="button" disabled={saving}>{saving ? 'Saving...' : 'Create User'}</button></div>
      </form>
    </section>
  )
}

function Field({ label, error, children }) {
  return <div className="field"><label>{label}</label>{children}{error && <span className="field-error">{error}</span>}</div>
}
