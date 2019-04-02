import React from  'react'

class Pins extends React.Component {
  componentDidMount () {
    const clientId = '33983'
    const url = `https://www.strava.com/oauth/authorize?client_id=33983&response_type=code&redirect_uri=http://localhost:6000&approval_prompt=force`
    const config = {
      // mode: 'no-cors'
    }

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  }

  render () {
    return null
  }
}

export default Pins
