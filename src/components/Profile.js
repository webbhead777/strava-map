import React from 'react'
import PERSON_IMAGE from '../images/person.png'
import LINKEDIN_BLACK from '../images/linkedin_black.png'
import LINKEDIN_COLOR from '../images/linkedin_color.png'
import GITHUB_BLACK from '../images/github_black.png'
import GITHUB_COLOR from '../images/github_color.png'
import STRAVA_COLOR from '../images/powered_by_strava.png'
import STRAVA_GREY from '../images/powered_by_strava_grey.png'

class Profile extends React.Component {
  state = {
    githubSrc: GITHUB_BLACK,
    linkedinSrc: LINKEDIN_BLACK,
    stravaSrc: STRAVA_GREY
  }

  render () {
    const { activitiesWithinState, animationDone, layer, location, map, numOfCommutes, totalActivities, totalActivitiesFinal, totalDistance } = this.props
    const { githubSrc, linkedinSrc, stravaSrc } = this.state
    const poundsOfCarbon = parseFloat(numOfCommutes * 2.4 * 1.49).toFixed().toLocaleString() // 1.49 pounds of C02 emission from Forester/mi

    return (
      <div className='container'>
        <div className='header'>
          <img className='avatar' src={PERSON_IMAGE} alt='Jake Webb Stäzrad' />
          <div className='title-box'>
            <h1 className='title'>Jake Webb Stäzrad</h1>
            <h2 className='sub-title'>Software Engineer</h2>
            <span>
              <a href='https://github.com/webbhead777' target='_blank' rel='noopener noreferrer'>
                <img className='image-logo' src={githubSrc} alt='Github' style={{ width: '46px', objectFit: 'cover' }}
                  onMouseEnter={() => this.setState({ githubSrc: GITHUB_COLOR })}
                  onMouseLeave={() => this.setState({ githubSrc: GITHUB_BLACK })} />
              </a>
              <a href='https://www.linkedin.com/in/jakewebbsite/' target='_blank' rel='noopener noreferrer'>
                <img className='image-logo' src={linkedinSrc} alt='LinkedIn'
                  onMouseEnter={() => this.setState({ linkedinSrc: LINKEDIN_COLOR })}
                  onMouseLeave={() => this.setState({ linkedinSrc: LINKEDIN_BLACK })} />
              </a>
            </span>
          </div>
        </div>
        <div className='row' style={{border: 'none'}}>
          <div className='activity-key' /> Strava activities logged: <span>{totalActivities} {!animationDone && `out of ${totalActivitiesFinal}`}</span>
        </div>
        <div className='row' style={{ fontSize: '12px' }}><b>🚲</b> CO2 saved from <div className='commute-count'>{numOfCommutes}</div> work commutes:<span style={{ paddingTop: '6px' }}>{poundsOfCarbon}lbs</span>
        </div>
        <div className='row'><div className='state-key' /># of activities in {location.state}: <span>{activitiesWithinState}</span></div>
        <div className='footer'>
          <div style={{ marginBottom: '-10px' }}><em>Application developed with</em> 🖤 <em>by that guy</em> ☝️</div>
          <br />
          <em>built with <a href='https://github.com/openlayers/openlayers' target='_blank' rel='noopener noreferrer'>openlayers</a>, <a href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>react.js</a> & <a href='https://www.strava.com/features' target='_blank' rel='noopener noreferrer'>strava api</a></em>
        </div>
        <a href='https://www.strava.com/athletes/28790206' target='_blank' rel='noopener noreferrer'>
          <img className='image' src={stravaSrc} alt='powered by Strava'
            onMouseEnter={() => this.setState({ stravaSrc: STRAVA_COLOR })}
            onMouseLeave={() => this.setState({ stravaSrc: STRAVA_GREY })} />
        </a>
      </div>
    )
  }
}

export default Profile
