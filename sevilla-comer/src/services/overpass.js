const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'
const SEVILLA_BBOX = '37.30,-6.05,37.48,-5.85'

const CUISINE_QUERIES = {
    tapas:    '["cuisine"~"tapas|spanish|andalusian",i]',
    japanese: '["cuisine"~"japanese|sushi|ramen",i]',
    italian:  '["cuisine"~"italian|pizza|pasta",i]',
    burger:   '["cuisine"~"burger|american|fast_food",i]',
    cafe:     '["amenity"~"cafe|coffee_shop",i]',
    seafood:  '["cuisine"~"seafood|fish|mariscos",i]',
}

export async function fetchPlaces(cuisineKey) {
    const filter = CUISINE_QUERIES[cuisineKey]

    let query

    if (cuisineKey === 'cafe') {
        query = `
            [out:json][timeout:15];
            (
                node${filter}(${SEVILLA_BBOX});
            );
            out body;
        `
    } else {
        query = `
           [out:json][timeout:15];
            (
                node["amenity"="restaurant"]${filter}(${SEVILLA_BBOX});
                node["amenity"="bar"]${filter}(${SEVILLA_BBOX});
                node["amenity"="fast_food"]${filter}(${SEVILLA_BBOX});
            );
            out body;
        ` 
    }

    console.log('Query enviada:', query)
    const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        body: query,
    })

    if (!res.ok) throw new Error('Error al contactar Overpass API')

    const data = await res.json()
    return data.elements.filter((el) => el.lat && el.lon)
}