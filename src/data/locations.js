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
    coords: fromLonLat([-118.2437, 34.0522]),
    geometry: getGeomFromJSON('california'),
    path: 'los-angeles',
    state: 'California'
  },
  {
    coords: fromLonLat([-117.1825, 34.0556]),
    geometry: getGeomFromJSON('california'),
    path: 'redlands',
    state: 'California'
  },
  {
    coords: fromLonLat([-117.1611, 32.7157]),
    geometry: getGeomFromJSON('california'),
    path: 'san-diego',
    state: 'California'
  },
  {
    coords: fromLonLat([-122.4194, 37.7749]),
    geometry: getGeomFromJSON('california'),
    path: 'san-francisco',
    state: 'California'
  },
  {
    coords: fromLonLat([-121.8863, 37.3382]),
    geometry: getGeomFromJSON('california'),
    path: 'san-jose',
    state: 'California'
  },
  {
    coords: fromLonLat([-105.2705, 40.0150]),
    geometry: getGeomFromJSON('colorado'),
    path: 'boulder',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-104.8214, 38.8339]),
    geometry: getGeomFromJSON('colorado'),
    path: 'colorado-springs',
    state: 'Colorado'
  },
  {
    coords: fromLonLat([-85.6681, 42.9634]),
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
    coords: fromLonLat([-119.8138, 39.5296]),
    geometry: getGeomFromJSON('nevada'),
    path: 'reno',
    state: 'Nevada'
  },
  {
    coords: fromLonLat([-121.3153, 44.0582]),
    geometry: getGeomFromJSON('oregon'),
    path: 'bend',
    state: 'Oregon'
  },
  {
    coords: fromLonLat([-123.0868, 44.0521]),
    geometry: getGeomFromJSON('oregon'),
    path: 'eugene',
    state: 'Oregon'
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
  },
  {
    coords: fromLonLat([-117.4260, 47.6588]),
    geometry: getGeomFromJSON('washington'),
    path: 'spokane',
    state: 'Washington'
  },
  {
    coords: fromLonLat([-87.6298, 41.8781]),
    geometry: getGeomFromJSON('illinois'),
    path: 'chicago',
    state: 'Illinois'
  },
  {
    coords: fromLonLat([-84.5037, 38.0406]),
    geometry: getGeomFromJSON('kentucky'),
    path: 'lexington',
    state: 'Kentucky'
  },
  {
    coords: fromLonLat([-90.1994, 38.6270]),
    geometry: getGeomFromJSON('missouri'),
    path: 'st-louis',
    state: 'Missouri'
  }
]

export default locations
