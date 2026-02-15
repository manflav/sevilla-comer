const OVERPASS_URL = 'https://overpass-api/interpreter'
const SEVILLA_BBOX = '37.30,-6.05,37.48,-5.85'

const CUISINE_QUERIES = {
    tapas:    '["cuisine"~"tapas|spanish|andalusian"]',
    japanese: '["cuisine"~"japanese|sushi|ramen"]',
    italian:  '["cuisine"~"italian|pizza|pasta"]',
    burger:   '["cuisine"~"burger|american|fast_food"]',
    cafe:     '["amenity"~"cafe|coffee_shop"]',
    seafood:  '["cuisine"~"seafood|fish|mariscos"]',
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

    const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        body: query,
    })

    if (!res.ok) throw new Error('Error al contactar Overpass API')

    const data = await res.json()
    return data.elements.filter((el) => el.lat && el.lon)
}