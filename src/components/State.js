import React from 'react'
import olFeature from 'ol/Feature'
import olStyle from 'ol/style/Style'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'

const State = props => {
  const { geometry, layer, map } = props
  const source = layer.getSource()
  const feature = new olFeature()

  feature.setGeometry(geometry)
  console.log('state', feature, geometry.getCoordinates())

  // feature.setStyle(
  //   new olStyle({
  //     fill: new olFill({ color: 'blue' }),
  //     stroke: new olStroke({
  //       color: '#fc4c02', width: 4
  //     })
  //   })
  // )
  source.addFeature(feature)
  console.log(source.getFeatures())
  map.on('click', ({ pixel }) => console.log(map.getFeaturesAtPixel(pixel)))


  return null
}

export default State
