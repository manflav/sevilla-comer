// Recibe el lugar seleccionado y una función para cerrar la tarjeta
export default function PlaceCard({ place, onClose }) {

  // Extraemos los datos del lugar con valores por defecto si no existen
  const name = place.tags?.name || 'Sin nombre'
  const cuisine = place.tags?.cuisine?.replace(/_/g, ' ') || '—'
  const address = place.tags?.['addr:street']
    ? `${place.tags['addr:street']} ${place.tags['addr:housenumber'] || ''}`
    : null
  const phone = place.tags?.phone || null
  const website = place.tags?.website || null
  const hours = place.tags?.opening_hours || null

  return (
    <div className="place-card">

      {/* Botón de cerrar */}
      <button className="place-card-close" onClick={onClose}>✕</button>

      {/* Nombre del lugar */}
      <div className="place-card-header">
        <span className="place-card-dot" />
        <h2 className="place-card-name">{name}</h2>
      </div>

      {/* Tipo de cocina */}
      <p className="place-card-cuisine">{cuisine}</p>

      {/* Detalles */}
      <div className="place-card-details">
        {address && (
          <div className="place-card-row">
            <span>📍</span>
            <span>{address}</span>
          </div>
        )}
        {phone && (
          <div className="place-card-row">
            <span>📞</span>
            <a href={`tel:${phone}`} className="place-card-link">{phone}</a>
          </div>
        )}
        {hours && (
          <div className="place-card-row">
            <span>🕐</span>
            <span>{hours}</span>
          </div>
        )}
        {website && (
          <div className="place-card-row">
            <span>🌐</span>
            <a href={website} target="_blank" rel="noreferrer" className="place-card-link">Ver web</a>
          </div>
        )}
      </div>

    </div>
  )
}