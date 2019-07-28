import olFeature from 'ol/Feature'
import olPolygon from 'ol/geom/Polygon'
import olMultiPolygon from 'ol/geom/MultiPolygon'
import olStyle from 'ol/style/Style'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import { fromLonLat } from 'ol/proj'

import { getBoundaryFromState } from '../utils'

const State = props => {
  const { layer, location, map } = props
  const source = layer.getSource()
  const { geometry } = getBoundaryFromState(location.state)
  const coords = geometry.type === 'MultiPolygon'
    ? geometry.coordinates.map(c => c.map(c => c.map(c => fromLonLat(c))))
    : geometry.coordinates.map(c => c.map(c => fromLonLat(c)))
  const olGeom = geometry.type === 'MultiPolygon'
    ? new olMultiPolygon(coords)
    : new olPolygon(coords)
  const feature = new olFeature({ geometry: olGeom })

  feature.setStyle(
    new olStyle({
      fill: new olFill({ color: '#7FDBFF33' }),
      stroke: new olStroke({
        color: '#0074D9', width: 2
      }),
      opacity: .6
    })
  )
  source.addFeature(feature)
  map.on('click', ({ pixel }) => console.log(map.getFeaturesAtPixel(pixel)))

  return null
}

export default State
