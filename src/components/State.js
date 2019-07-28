import React from 'react'
import olFeature from 'ol/Feature'
import olPolygon from 'ol/geom/Polygon'
import olStyle from 'ol/style/Style'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import { fromLonLat, ransform } from 'ol/proj'

import { getBoundaryFromState, getGeomFromJSON } from '../utils'

const State = props => {
  const { layer, location,  location: { geometry }, map } = props
  const source = layer.getSource()
  const coords = getBoundaryFromState(location.state).geometry.coordinates.map(coord => fromLonLat(coord))
  console.log(getBoundaryFromState(location.state), coords)
  const feature = new olFeature({ geometry: new olPolygon(coords) })

  console.log('state', feature.getGeometry().getCoordinates())

  feature.setStyle(
    new olStyle({
      fill: new olFill({ color: 'blue' }),
      stroke: new olStroke({
        color: '#fc4c02', width: 4
      })
    })
  )
  source.addFeature(feature)
  console.log(source.getFeatures())
  map.on('click', ({ pixel }) => console.log(map.getFeaturesAtPixel(pixel)))


  return null
}

export default State
