import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from '@obsidians/redux'
import Network from '@obsidians/network'

class NetworkWithProps extends PureComponent {
  state = {
    active: true
  }

  componentDidMount () {
    this.props.cacheLifecycles.didCache(() => this.setState({ active: false }))
    this.props.cacheLifecycles.didRecover(() => this.setState({ active: true }))
  }

  render () {
    return (
      <Network
        minerKey
        // minerTerminal
        networkId={this.props.network}
        active={this.state.active}
      />
    )
  }
}


export default connect([
  'network',
])(withRouter(NetworkWithProps))
