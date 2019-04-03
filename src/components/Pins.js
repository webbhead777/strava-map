import React from  'react'
import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olIcon from 'ol/style/Icon'
import olCircleStyle from 'ol/style/Circle'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import { fromLonLat } from 'ol/proj'
import ACTIVITIES from '../data/activities'

class Pins extends React.Component {
  componentDidMount () {
    const { layer, map } = this.props
    const source = layer.getSource()
    const activities = ACTIVITIES.reverse()

    activities.forEach((activity, i) => {
      const { start_latlng: coords } = activity
      console.log('coords', coords.reverse())
      const feature = new olFeature({
        geometry: new olPoint(fromLonLat(coords))
      })

      feature.setStyle(
        new olStyle({
          image: new olCircleStyle({
            radius: 10,
            fill: new olFill({ color: '#f8ab87' }),
            stroke: new olStroke({
              color: '#fc4c02', width: 4
            })
          })
        })
      )
      new Promise((resolve, reject) => {
        setTimeout(() => {
          source.addFeature(feature)
          resolve(feature)
        }, i * 20)
      })
      .then(feature => {
        setTimeout(() => {
          feature.setStyle(
            new olStyle({
              image: new olCircleStyle({
                radius: 5,
                fill: new olFill({ color: '#fc4c02' }),
                stroke: new olStroke({
                  color: '#fc4c02', width: 2
                })
              })
            })
          )
        }, 600)
      })
    })
  }

  render () {
    return null
  }
}

export default Pins
