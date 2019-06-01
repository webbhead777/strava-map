import { fromLonLat } from 'ol/proj'

const locations = [
  { // default denver to first value in locations array
    coords: fromLonLat([-104.991531, 39.742043]),
    path: 'denver',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-117.1825, 34.0556]),
    path: 'redlands',
    state: 'California'
  },
  {
    coords: fromLonLat([-105.2705, 40.0150]),
    path: 'boulder',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-115.1398, 36.1699]),
    path: 'las-vegas',
    state: 'Nevada'
  },
  {
    coords: fromLonLat([-111.4980, 40.6461]),
    path: 'park-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.6585, 40.2338]),
    path: 'provo',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.8910, 40.7608]),
    path: 'salt-lake-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-122.3321, 47.6062]),
    path: 'seattle',
    state: 'Washington'
  }
]

export default locations
