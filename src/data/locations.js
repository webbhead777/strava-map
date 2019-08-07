import { fromLonLat } from 'ol/proj'
import { getGeomFromJSON } from '../utils'

const locations = [
  { // default denver to first value in locations array
    coords: fromLonLat([-104.991531, 39.742043]),
    geometry: getGeomFromJSON('colorado'),
    path: 'denver',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-117.1825, 34.0556]),
    geometry: getGeomFromJSON('california'),
    path: 'redlands',
    state: 'California'
  },
  {
    coords: fromLonLat([-105.2705, 40.0150]),
    geometry: getGeomFromJSON('colorado'),
    path: 'boulder',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-85.6681, 42.9634,]),
    geometry: getGeomFromJSON('michigan'),
    path: 'grand-rapids',
    state: 'Michigan'
  },
  {
    coords: fromLonLat([-115.1398, 36.1699]),
    geometry: getGeomFromJSON('nevada'),
    path: 'las-vegas',
    state: 'Nevada'
  },
  {
    coords: fromLonLat([-122.6750, 45.5051]),
    geometry: getGeomFromJSON('oregon'),
    path: 'portland',
    state: 'Oregon'
  },
  {
    coords: fromLonLat([-111.4980, 40.6461]),
    geometry: getGeomFromJSON('utah'),
    path: 'park-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.6585, 40.2338]),
    geometry: getGeomFromJSON('utah'),
    path: 'provo',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-111.8910, 40.7608]),
    geometry: getGeomFromJSON('utah'),
    path: 'salt-lake-city',
    state: 'Utah'
  },
  {
    coords: fromLonLat([-122.3321, 47.6062]),
    geometry: getGeomFromJSON('washington'),
    path: 'seattle',
    state: 'Washington'
  }
]

export default locations
