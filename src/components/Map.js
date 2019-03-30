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

const DENVER_COORD = fromLonLat([-104.991531, 39.742043])

class Map extends React.Component {
  constructor () {
    super()


    const baseLayer = new olTileLayer({
      source: new OSM()
    })
    const layer = new olVectorLayer({
      source: new olVectorSource()
    })
    const map = new olMap({
      view: new olView({
        center: DENVER_COORD,
        zoom: 11
      }),
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
      map
    }
  }

  componentDidMount () {
    const { layer, map } = this.state
    const source = layer.getSource()
    const stravaLogoFeature = new olFeature({
      geometry: new olPoint(DENVER_COORD)
    })

    stravaLogoFeature.setStyle(
      new olStyle({
        image: new olIcon({
          src: STRAVA_LOGO,
          opacity: .8
        })
      })
    )
    // add strava logo after tiles load in
    map.once('rendercomplete', () => {
      setTimeout(() => source.addFeature(stravaLogoFeature), 400)
    })
    source.on('addfeature', (e) => {
      // animation
      setTimeout(() => {
        const view = map.getView()

        // zoom out to full extent
        view.animate({
          anchor: DENVER_COORD,
          easing: easeIn,
          duration: 400,
          zoom: 5
        })
        // scale logo down for new extent
        stravaLogoFeature.getStyle().getImage().setScale(.5)
        this.setState({ initialized: true })
      }, 1200)
    })
  }

  render () {
    const { initialized } = this.state

    return !initialized ? null : (
      <Pins />
    )
  }
}

export default Map
