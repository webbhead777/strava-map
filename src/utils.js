import { fromLonLat } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON'

export const getGeomFromJSON = state => (new GeoJSON()).readFeatures(require(`./boundaries/${state.toLowerCase()}`))[0].getGeometry()

export const getBoundaryFromState = state => require(`./boundaries/${state.toLowerCase()}`)
