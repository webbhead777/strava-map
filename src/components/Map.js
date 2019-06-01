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
import qs from 'qs'
import STRAVA_LOGO from '../images/strava-logo.svg'
import Pins from './Pins'

const STL_COORD = fromLonLat([-90.4994, 38.6270])
const locations = [
  { // default denver to first value in locations array
    coords: fromLonLat([-104.991531, 39.742043]),
    path: 'denver',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-117.1825, 34.0556]),
    path: 'redlands',
    state: 'California'
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
    coords: fromLonLat([-111.4980, 40.6461]),
    path: 'park-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.6585, 40.2338]),
    path: 'provo',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.8910, 40.7608]),
    path: 'salt-lake-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-122.3321, 47.6062]),
    path: 'seattle',
    state: 'Washington'
  }
]

class Map extends React.Component {
  constructor () {
    super()
    
    const { imgUrl, loc } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const location = locations.find(location => location.path === loc) || locations[0]
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
      imgUrl: imgUrl || null,
      layer,
      location,
      map
    }
  }

  componentDidMount () {
    const { imgUrl, layer, location, map } = this.state
    const source = layer.getSource()
    const locationLogoFeature = new olFeature({
      geometry: new olPoint(location.coords)
    })

    locationLogoFeature.setStyle(
      new olStyle({
        image: new olIcon({
          src: imgUrl || STRAVA_LOGO
        })
      })
    )
    // add strava logo after tiles load in
    map.once('rendercomplete', () => {
      setTimeout(() => source.addFeature(locationLogoFeature), 800)
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
        locationLogoFeature.getStyle().getImage().setScale(.5)
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
