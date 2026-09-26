import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ListPage from './pages/ListPage'
import AddPage from './pages/AddPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
      </Route>
    </Routes>
  )
}
