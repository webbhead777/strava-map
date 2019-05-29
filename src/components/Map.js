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
import { easeIn } from 'ol/easing'
import OSM from 'ol/source/OSM'
// import { BingMaps, Vector as olVectorSource } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import STRAVA_LOGO from '../images/strava-logo.svg'
import Pins from './Pins'

const STL_COORD = fromLonLat([-90.4994, 38.6270])
const locations = [
  {
    coords: fromLonLat([-104.991531, 39.742043]),
    path: 'denver',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-105.2705, 40.0150]),
    path: 'boulder',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-115.1398, 36.1699]),
    path: 'las-vegas',
    state: 'Nevada'
  },
  {
    coords: fromLonLat([-111.8910, 40.7608]),
    path: 'salt-lake-city',
    state: 'Utah'
  }
]

class Map extends React.Component {
  constructor () {
    super()

    const path = window.location.pathname.substring(1)
    const location = locations.find(location => location.path === path) || locations[0]
    const baseLayer = new olTileLayer({
      source: new OSM()
    })
    const layer = new olVectorLayer({
      source: new olVectorSource()
    })
    const map = new olMap({
      view: new olView({
        center: location.coords,
        zoom: 11
      }),
      controls: [],
      interactions: [], // remove interactions to add back after animation
      layers: [
        baseLayer,
        layer
      ],
      target: 'map'
    })

    this.state = {
      initialized: false,
      baseLayer,
      layer,
      location,
      map
    }
  }

  componentDidMount () {
    const { layer, location, map } = this.state
    const source = layer.getSource()
    const stravaLogoFeature = new olFeature({
      geometry: new olPoint(location.coords)
    })

    stravaLogoFeature.setStyle(
      new olStyle({
        image: new olIcon({
          src: STRAVA_LOGO
        })
      })
    )
    // add strava logo after tiles load in
    map.once('rendercomplete', () => {
      setTimeout(() => source.addFeature(stravaLogoFeature), 800)
    })
    source.once('addfeature', (e) => {
      // animation delay
      setTimeout(() => {
        const view = map.getView()

        // move view to stl
        view.animate({
          anchor: location.coords,
          center: STL_COORD,
          easing: easeIn,
          duration: 400,
          zoom: 11
        })
        // scale logo down for new extent
        stravaLogoFeature.getStyle().getImage().setScale(.5)
        // slightly longer than animation duration
        setTimeout(() => {
          this.setState({ initialized: true })
        }, 1000)
      }, 800)
    })
  }

  render () {
    const { initialized, layer, location, map } = this.state

    return !initialized ? null : (
      <Pins layer={layer} location={location} map={map} />
    )
  }
}

export default Map
