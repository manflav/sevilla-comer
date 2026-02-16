import {useState} from 'react'
import FilterBar from './components/FilterBar'
import MapComponent from './components/Map'
import PlaceCard from './components/PlaceCard'
import logo from './assets/logo-white.svg'

export default function App() {
  const [activeFilter, setActiveFilter] = useState(null)
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="app-wrapper">
      <header className="app-header">
          <img className="logo-sub" src={logo} alt="Dónde comer" />
      </header>
      
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setPlaces={setPlaces}
        setLoading={setLoading}
        setSelectedPlace={setSelectedPlace}
      />
      <main className="map-container">
        <MapComponent
          places={places}
          onSelectPlace={setSelectedPlace}
        />
        {selectedPlace && (
          <PlaceCard
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </main>
    </div>
  )
}