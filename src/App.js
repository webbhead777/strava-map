import React, { Component } from 'react'
import Map from './components/Map'
import LOGO from './images/powered_by_strava.png'

class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <img className='image' src={LOGO} alt='powered by Strava' />
      </div>
    )
  }
}

export default App
