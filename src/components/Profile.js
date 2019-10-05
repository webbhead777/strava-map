import React from 'react'
import PERSON_IMAGE from '../images/person.png'
import LINKEDIN_IMAGE from '../images/linkedin.png'
import GITHUB_IMAGE from '../images/github.png'
import STRAVA_LOGO from '../images/powered_by_strava.png'

class Profile extends React.Component {
  render () {
    const { activitiesWithinState, animationDone, layer, location, map, numOfCommutes, totalActivities, totalActivitiesFinal, totalDistance } = this.props

    return (
      <div className='container'>
        <div className='header'>
          <img className='avatar' src={PERSON_IMAGE} alt='Jake Webb Stäzrad' />
          <div className='title-box'>
            <h1 className='title'>Jake Webb Stäzrad</h1>
            <h2 className='sub-title'>Software Engineer</h2>
            <span>
              <a href='https://github.com/webbhead777' target='_blank' rel='noopener noreferrer'>
                <img className='image-logo' src={LINKEDIN_IMAGE} alt='LinkedIn' />
              </a>
              <a href='https://www.linkedin.com/in/jakewebbsite/' target='_blank' rel='noopener noreferrer'>
                <img className='image-logo' src={GITHUB_IMAGE} alt='Github' />
              </a>
            </span>
          </div>
        </div>
        <div className='row' style={{border: 'none'}}>
          Strava activities logged: <span>{totalActivities} {!animationDone && `out of ${totalActivitiesFinal}`}</span>
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
