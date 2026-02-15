import {useEffect, useRef} from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/Layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Feature from 'ol/Feature'
import Point from 'ol/Point'
import {fromLonLat} from 'ol/proj'
import {Style, Circle, Fill, Stroke} from 'ol/style'
import 'ol/ol.css'

const SEVILLA_CENTER = fromLonLat([-5.9845, 37.3891])

const markerStyle = new Style({
    image: new Circle({
        radius:8,
        fill: new Fill({color:'#E8470A'}),
        stroke: new Stroke({color: '#fff', width: 2 }),
    }),
})


export default function MapComponent({places, onSelecPlace}) {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const vectorSourceRef = useRef(new VectorSource())

    useEffect(() => {

        const map = new Map({
            target: mapRef.current,

            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',

                    }),
                }),

                new VectorLayer({
                    source: vectorSourceRef.current,
                    style: markerStyle,
                }),
            ],
            view: new View({
                center: SEVILLA_CENTER,
                zoom: 14,
            }),
        })




    })


}