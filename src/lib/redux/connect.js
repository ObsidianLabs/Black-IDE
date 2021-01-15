import { connect as connectRedux } from 'react-redux'
import pick from 'lodash/pick'

export function connect (keys) {
  return connectRedux(state => pick(state, keys))
}
