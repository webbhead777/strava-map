import React from  'react'
import ACTIVITIES from '../data/activities'

class Pins extends React.Component {
  componentDidMount () {
    console.log(ACTIVITIES.reverse())
  }

  render () {
    return null
  }
}

export default Pins
