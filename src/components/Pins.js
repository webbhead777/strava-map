import React from  'react'
import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olStyle from 'ol/style/Style'
import olCircleStyle from 'ol/style/Circle'
import olFill from 'ol/style/Fill'
import olStroke from 'ol/style/Stroke'
import olDoubleClickZoom from 'ol/interaction/DoubleClickZoom'
import olMouseWheelZoom from 'ol/interaction/MouseWheelZoom'
import olDragPan from 'ol/interaction/DragPan'
import { easeIn } from 'ol/easing'
import { fromLonLat } from 'ol/proj'
import ACTIVITIES from '../data/activities'
import PERSON_IMAGE from '../images/person.png'
import LOGO from '../images/powered_by_strava.png'
import olIcon from 'ol/style/Icon'
import Profile from './Profile'
console.log(ACTIVITIES)

const STL_COORD = fromLonLat([-90.4994, 38.6270])
const US_CENTER_COORD = fromLonLat([-97.0000, 38.0000])

class Pins extends React.Component {
  constructor () {
    super()

    this.state = {
      activitiesWithinState: 0,
      animationDone: false,
      numOfCommutes: 0,
      totalActivities: 0,
      totalDistance: 0
    }
  }

  componentDidMount () {
    const { layer, location, map } = this.props
    const source = layer.getSource()
    const activities = ACTIVITIES.reverse()
    let activitiesWithinState = 0
    let distanceInMeters = 0
    let numOfCommutes = 0
    let totalActivities = 0

    setTimeout(() => {
      activities.forEach((activity, i) => {
        const { commute, distance, start_latlng: coords } = activity
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
            const totalDistance = parseFloat(distanceInMeters / 1609.34).toFixed(0) // meters per mile
            const activityIsWithinState = !!location.geometry.intersectsCoordinate(coords)

            // check if activity coords intersect us state geometry
            if (activityIsWithinState) activitiesWithinState++
            // increment total
            totalActivities++
            // addon distance for each activity
            distanceInMeters += distance
            // check if commute
            if (commute) numOfCommutes++

            this.setState({ activitiesWithinState, numOfCommutes, totalActivities, totalDistance })
            feature.setStyle(
              new olStyle({
                image: new olCircleStyle({
                  radius: 5,
                  fill: new olFill({ color: `${activityIsWithinState ? '#0074D9' : '#fc4c02'}` }),
                  stroke: new olStroke({
                    color: `${activityIsWithinState ? '#0074D9' : '#fc4c02'}`,
                    width: 4
                  })
                })
              })
            )

            // only on last animation
            if (i === activities.length - 1) {
              this.setState({ animationDone: true })
              // add interactions back no that animation is done
              map.addInteraction(new olDoubleClickZoom())
              map.addInteraction(new olMouseWheelZoom())
              map.addInteraction(new olDragPan())
            }
          }, 100)
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
    const { layer, location, map } = this.props
    const { activitiesWithinState, numOfCommutes, totalActivities, totalDistance } = this.state

    return (
      <Profile {...this.props} {...this.state} />
    )
  }
}

export default Pins
