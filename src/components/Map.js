import React from 'react'

import olMap from 'ol/Map'
import olView from 'ol/View'
import olTileLayer from 'ol/layer/Tile'
import olVectorLayer from 'ol/layer/Vector'
import olVectorSource from 'ol/source/Vector'
import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olIcon from 'ol/style/Icon'
import OSM from 'ol/source/OSM'
// import { BingMaps, Vector as olVectorSource } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import STRAVA_LOGO from '../images/strava-logo.svg'

console.log(STRAVA_LOGO)

const DENVER_LON_LAT = [-104.991531, 39.742043]

class Map extends React.Component {
  constructor () {
    super()

    const layer = new olVectorLayer({
      source: new olVectorSource()
    })
    const map = new olMap({
      view: new olView({
        center: fromLonLat(DENVER_LON_LAT),
        zoom: 9
      }),
      layers: [
        new olTileLayer({
          source: new OSM()
        }),
        layer
      ],
      target: 'map'
    })

    this.state = {
      layer,
      map
    }
  }

  componentDidMount () {
    const { layer } = this.state
    const source = layer.getSource()
    const stravaLogoFeature = new olFeature({
      geometry: new olPoint(fromLonLat(DENVER_LON_LAT))
    })

    stravaLogoFeature.setStyle(
      new olStyle({
        image: new olIcon({
          src: STRAVA_LOGO
        })
      })
    )

    console.log(stravaLogoFeature)

    source.addFeature(stravaLogoFeature)
  }

  render () {
    return null
  }
}

export default Map
