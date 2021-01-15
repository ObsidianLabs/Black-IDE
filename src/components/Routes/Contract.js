import React, { Component } from 'react'

import { Screen, Button } from '@obsidians/ui-components'
import redux, { connect } from '@obsidians/redux'
import Contract from '@obsidians/contract'

import { withRouter } from 'react-router-dom'

class ContractWithProps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addressBook: []
    }
    this.page = React.createRef()
    props.cacheLifecycles.didRecover(this.checkLocation)
  }

  shouldComponentUpdate (props, state) {
    return (
      this.props.uiState.get('localNetwork') !== props.uiState.get('localNetwork') ||
      this.props.match !== props.match
    )
  }

  componentDidUpdate () {
    this.checkLocation()
  }

  checkLocation = () => {
    const match = this.props.match
    if (match && match.params) {
      const name = match.params.name || ''
      this.updateSelected(name)
    }
  }

  updateSelected = name => {
    const pageRef = this.page.current
    if (!pageRef) {
      return
    }
    if (name !== pageRef.currentValue) {
      pageRef.openTab(name)
    }
  }

  getSelected = (props = this.props) => props.contracts.getIn([props.network, 'selected']);

  getTabs = () => {
    const tabs = this.props.contracts.getIn([this.props.network, 'tabs'])
    return tabs ? tabs.toArray() : []
  }

  getStarred = () => {
    const starred = this.props.accounts.getIn([this.props.network, 'accounts'])
    return starred ? starred.toArray() : []
  }

  onValueChanged = value => {
    redux.dispatch('SELECT_CONTRACT', {
      network: this.props.network,
      contract: value
    })
    this.props.history.push(`/contract/${value}`)
  }

  onChangeStarred = starred => {
    redux.dispatch('SET_STARRED', {
      network: this.props.network,
      starred
    })
  }

  onTabsUpdated = tabs => {
    redux.dispatch('SET_CONTRACT_TABS', {
      network: this.props.network,
      tabs
    })
  }

  render () {
    const { network, uiState } = this.props

    if (network === 'dev' && !uiState.get('localNetwork')) {
      return (
        <Screen>
          <h4 className='display-4'>Disconnected</h4>
          <p className='lead'>Please start an Ethereum node.</p>
          <hr />
          <span>
            <Button color='primary' onClick={() => this.props.history.push(`/network/${network}`)}>Go to Network</Button>
          </span>
        </Screen>
      )
    }

    return (
      <Contract
        ref={this.page}
        network={network}
        address={this.getSelected()}
        tabs={this.getTabs()}
        starred={this.getStarred()}
        addressBook={this.state.addressBook}
        onValueChanged={this.onValueChanged}
        onChangeStarred={this.onChangeStarred}
        onTabsUpdated={this.onTabsUpdated}
      />
    )
  }
}

export default connect([
  'uiState',
  'network',
  'contracts',
  'accounts',
])(withRouter(ContractWithProps))
