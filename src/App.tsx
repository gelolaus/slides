import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TemplateDeck from './decks/template/TemplateDeck'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/template" element={<TemplateDeck />} />
      </Routes>
    </BrowserRouter>
  )
}
