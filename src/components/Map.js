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
import locations from '../data/locations'
import Pins from './Pins'
import State from './State'

const STL_COORD = fromLonLat([-90.4994, 38.6270])

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

    return !initialized
      ? null
      :  (
        <React.Fragment>
          <State location={location} layer={layer} map={map} />
          <Pins layer={layer} location={location} map={map} />
        </React.Fragment>
      )
  }
}

export default Map
