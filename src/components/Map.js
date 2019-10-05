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
import PERSON_IMAGE from '../images/person.png'
import PIN_IMAGE from '../images/pin.png'
import locations from '../data/locations'
import Pins from './Pins'
import State from './State'

import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {Cluster, Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js'

const STL_COORD = fromLonLat([-90.4994, 38.6270])

class Map extends React.Component {
  constructor () {
    super()

    const { imgUrl, loc } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const location = locations.find(location => location.path === loc) || locations[0]
    const baseLayer = new olTileLayer({ source: new OSM() })
    const pinsLayer = new olVectorLayer({ source: new olVectorSource() })
    const stateLayer = new olVectorLayer({ source: new olVectorSource() })
    const distance = document.getElementById('distance')
    const clusterSource = new Cluster({
      source: new olVectorSource()
    })
    const styleCache = {} // this makes prev size computes more efficient
    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: feature => {
        var size = feature.get('features').length;
        var style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#3399CC'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff'
              })
            })
          });
          styleCache[size] = style;
        }
        return style;
      }
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
        pinsLayer,
        clusterLayer,
        stateLayer
      ],
      target: 'map'
    })

    this.state = {
      baseLayer,
      clusterLayer,
      imgUrl: imgUrl || null,
      initialized: false,
      pinsLayer,
      stateLayer,
      location,
      map
    }
  }

  componentDidMount () {
    const { imgUrl, stateLayer, location, map } = this.state
    const source = stateLayer.getSource()
    const locationLogoFeature = new olFeature({
      geometry: new olPoint(location.coords)
    })
    const src = imgUrl || PIN_IMAGE
    const imageElem = new Image()
    let zoomedOutScale
    const createOlImage = () => {
      const longestPlane = imageElem.naturalWidth > imageElem.naturalHeight ? imageElem.naturalWidth : imageElem.naturalHeight
      const scale = 380 / longestPlane
      zoomedOutScale = 200 / longestPlane

      locationLogoFeature.setStyle(
        new olStyle({
          image: new olIcon({
            src,
            scale
          })
        })
      )
    }
    imageElem.onload = createOlImage
    imageElem.src = src

    const homeImageFeature = new olFeature({
      geometry: new olPoint(fromLonLat([-90.253143, 38.617015])) // south city stl
    })
    homeImageFeature.setStyle(
      new olStyle({
        image: new olIcon({
          src: PERSON_IMAGE,
          scale: .25
        })
      })
    )

    // add location logo after tiles load in
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
        locationLogoFeature.getStyle().getImage().setScale(zoomedOutScale)
        // add home image
        source.addFeature(homeImageFeature)
        // slightly longer than animation duration
        setTimeout(() => {
          this.setState({ initialized: true })
          // remove home image
          source.removeFeature(homeImageFeature)
        }, 2000)
      }, 800)
    })
  }

  render () {
    const { initialized, pinsLayer, stateLayer, location, map } = this.state

    return !initialized
      ? null
      :  (
        <React.Fragment>
          <State location={location} layer={stateLayer} map={map} />
          <Pins layer={pinsLayer} location={location} map={map} />
        </React.Fragment>
      )
  }
}

export default Map
