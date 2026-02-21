import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TemplateDeck from './decks/template/TemplateDeck'
import PersonalSafetyDeck from './decks/JPCS_Google_Personal_Safety_Presentation/PersonalSafetyDeck'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/template" element={<TemplateDeck />} />
        <Route path="/jpcs-personal-safety" element={<PersonalSafetyDeck />} />
      </Routes>
    </BrowserRouter>
  )
}
