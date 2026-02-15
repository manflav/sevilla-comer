import {useState} from 'react'
import FilterBar from './components/FilterBar'

export default function App() {
  const [activeFilter, setActiveFilter] = useState(null)
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Sevilla Comer</h1>
      </header>
      
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setPlaces={setPlaces}
        setLoading={setLoading}
        setSelectedPlace={setSelectedPlace}
      />
    </div>
  )
}