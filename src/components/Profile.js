import React from 'react'
import PERSON_IMAGE from '../images/person.png'
import STRAVA_LOGO from '../images/powered_by_strava.png'

class Profile extends React.Component {
  render () {
    const { activitiesWithinState, layer, location, map, numOfCommutes, totalActivities, totalDistance } = this.props

    return (
      <div className='container'>
        <div className='header'>
          <img className='avatar' src={PERSON_IMAGE} alt='Jake Webb Stäzrad' />
          <div className='title-box'>
            <h1 className='title'>Jake Webb Stäzrad</h1>
            <h2 className='sub-title'>Software Engineer</h2>
          </div>
        </div>
        <div className='row' style={{border: 'none'}}>
          Strava activities logged: <span>{totalActivities}</span>
        </div>
        <div className='row'>🚲work commutes  🚲<span>{numOfCommutes}</span></div>
        <div className='row'>activities in {location.state}: <span>{activitiesWithinState}</span></div>
        <a href='https://www.strava.com/athletes/28790206' target='_blank' rel='noopener noreferrer'>
          <img className='image' src={STRAVA_LOGO} alt='powered by Strava' />
        </a>
      </div>
    )
  }
}

export default Profile
