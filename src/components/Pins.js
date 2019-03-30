import React from  'react'

class Pins extends React.Component {
  componentDidMount () {
    const clientId = process.env.client_id
    console.log(process.env)
    const url = `https://www.strava.com/oauth/authorize?client_id=${clientId}`
    const config = {

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
