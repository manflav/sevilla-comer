import { fetchPlaces } from "../services/overpass"

const FILTERS = [
  { id: 'tapas',    label: 'Tapas',        emoji: '🫒' },
  { id: 'japanese', label: 'Japonés',      emoji: '🍣' },
  { id: 'italian',  label: 'Italiano',     emoji: '🍕' },
  { id: 'burger',   label: 'Hamburguesas', emoji: '🍔' },
  { id: 'cafe',     label: 'Cafeterías',   emoji: '☕' },
  { id: 'seafood',  label: 'Mariscos',     emoji: '🦐' },
]

export default function FilterBar({activeFilter, setActiveFilter, setPlaces, setLoading, setSelectedPlace}) {
    const handleFilter = async (Filter) => {
        if (activeFilter === Filter.id) {
            setActiveFilter(null)
            setPlaces([])
            setSelectedPlace(null)
            return
        }

        setActiveFilter(Filter.id)
        setSelectedPlace(null)
        setLoading(true)
        setPlaces([])

        try {
            const results =await fetchPlaces(Filter.id)
            console.log('Resultados:', results)
            setPlaces(results)
        }   catch (e) {
            console.error(e)
            setPlaces([])
        }   finally {
            setLoading(false)
        }
    }
    
    
    return (
        <nav className="filter-bar">
            {FILTERS.map((f) => (
                <button
                key={f.id}
                className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => handleFilter(f)}
                >
                    {f.emoji} {f.label}
                </button>
            ))}
        </nav>
    )
}