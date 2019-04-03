import React from  'react'
import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olIcon from 'ol/style/Icon'
import olFill from 'ol/style/Fill'
import { fromLonLat } from 'ol/proj'
import ACTIVITIES from '../data/activities'

class Pins extends React.Component {
  componentDidMount () {
    const source = this.props.layer.getSource()
    const activities = ACTIVITIES.reverse()
    console.log(activities)

    activities.forEach(activity => {
      const { start_latlng: coords } = activity
      console.log('coords', coords.reverse())
      const feature = new olFeature({
        geometry: new olPoint(fromLonLat(coords))
      })

      // feature.setStyle(
      //   new olStyle({
      //     fill: new olFill({
      //       color: '#fc4c02'
      //     })
      //   })
      // )
      source.addFeature(feature)
    })
    console.log('features', source.getFeatures())
  }

  render () {
    return null
  }
}

export default Pins
