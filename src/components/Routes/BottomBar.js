import React from 'react'

import { connect } from '@obsidians/redux'
import BottomBar from '@obsidians/bottombar'

function BottomBarWithProps (props) {
  return (
    <BottomBar
      txs={props.queue.getIn([props.network, 'txs'])}
    />
  )
}

export default connect(['queue', 'network'])(BottomBarWithProps)
