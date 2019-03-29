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
import debounce from 'lodash.debounce'
import STRAVA_LOGO from '../images/strava-logo.svg'

console.log(STRAVA_LOGO)

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
        zoom: 12
      }),
      layers: [
        baseLayer,
        layer
      ],
      target: 'map'
    })

    this.state = {
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
          src: STRAVA_LOGO
        })
      })
    )
    // add strava logo after tiles load in
    map.once('rendercomplete', () => {
      source.addFeature(stravaLogoFeature)
    })
    // const tileLoadDebounce = debounce(() => {
    //   source.addFeature(stravaLogoFeature)
    //   map.un('postrender', tileLoadDebounce)
    // }, 2000)
    // map.on('postrender', tileLoadDebounce)
    source.on('addfeature', () => {
      console.log('feature added!')
      stravaLogoFeature.getStyle().getImage().setScale(1)
      map.getView().setZoom(12)

      setTimeout(this.zoomToExtent, 3000)
      setTimeout(() => {
        console.log(stravaLogoFeature.getStyle().getImage().setScale(.5))
      }, 3000)
    })
  }

  zoomToExtent = () => {
    const { map } = this.state
    const view = map.getView()

    view.animate({
      anchor: DENVER_COORD,
      easing: easeIn,
      duration: 1800,
      zoom: 5
    })
  }

  render () {
    return null
  }
}

export default Map
