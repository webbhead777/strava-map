import React from  'react'
import olView from 'ol/View'
import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olIcon from 'ol/style/Icon'
import olCircleStyle from 'ol/style/Circle'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import olDoubleClickZoom from 'ol/interaction/DoubleClickZoom'
import olMouseWheelZoom from 'ol/interaction/MouseWheelZoom'
import { easeIn } from 'ol/easing'
import { fromLonLat } from 'ol/proj'
import ACTIVITIES from '../data/activities'

const STL_COORD = fromLonLat([-90.4994, 38.6270])
const US_CENTER_COORD = fromLonLat([-97.0000, 38.0000])
// this is hacky
let distanceInMeters = 0
ACTIVITIES.forEach(({ distance }) => distanceInMeters += distance)
const totalDistance = parseFloat(distanceInMeters / 1609.34).toFixed(0) // meters per mile

class Pins extends React.Component {
  constructor () {
    super()

    this.state = {
      animationDone: false
    }
  }

  componentDidMount () {
    const { layer, map } = this.props
    const source = layer.getSource()
    const activities = ACTIVITIES.reverse()
    console.log(activities)

    setTimeout(() => {

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
          }, i * 22)
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
            if (i === activities.length - 1) {
              this.setState({ animationDone: true })
              // add interactions back no that animation is done
              map.addInteraction(new olDoubleClickZoom())
              map.addInteraction(new olMouseWheelZoom())
            }
          }, 600)
        })
      })

      // animate view to full extent
      setTimeout(() => {
        const view = map.getView()

        view.animate({
          anchor: STL_COORD,
          center: US_CENTER_COORD,
          easing: easeIn,
          duration: 400,
          zoom: 5
        })

      }, 2400)
    }, 1000)
  }

  render () {
    return !this.state.animationDone
      ? null
      : (
        <a href='https://www.strava.com/athletes/28790206' target='_blank'>
          <div className='container'>
            <div className='row'>Strava Activities: <span>{ACTIVITIES.length}</span></div>
            <div className='row'>Miles Logged: <span>{totalDistance}</span></div>
            <div className='row'># of Activities in Colorado: <span>0</span></div>
            <div className='row'><span style={{fontWeight: 'normal', fontSize: '18px'}}>🙀<em>help me fix this</em>☝🏻</span></div>
          </div>
        </a>
      )
  }
}

export default Pins
