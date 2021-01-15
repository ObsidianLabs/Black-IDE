import React, { PureComponent } from 'react'

import { connect } from '@obsidians/redux'

import platform from '@obsidians/platform'
import headerActions, { Header, NavGuard } from '@obsidians/header'
import { networkManager } from '@obsidians/network'
import { actions } from '@obsidians/workspace'

import { List } from 'immutable'

const networkList = [
  {
    id: 'ropsten',
    group: 'testnet',
    name: 'Ropsten',
    fullName: 'Ropsten Testnet',
    icon: 'fas fa-vial',
    notification: 'Switched to <b>Ropsten Testnet</b>.',
    url: '/',
  },
  {
    id: 'rinkeby',
    group: 'testnet',
    name: 'Rinkeby',
    fullName: 'Rinkeby Testnet',
    icon: 'fas fa-vial',
    notification: 'Switched to <b>Rinkeby Testnet</b>.',
    url: '/',
  },
  // {
  //   id: 'gorli',
  //   group: 'testnet',
  //   name: 'Gorli',
  //   fullName: 'Gorli Testnet',
  //   icon: 'fas fa-vial',
  //   notification: 'Switched to <b>Gorli Testnet</b>.',
  //   url: '/',
  // },
  {
    id: 'kovan',
    group: 'testnet',
    name: 'Kovan',
    fullName: 'Kovan Testnet',
    icon: 'fas fa-vial',
    notification: 'Switched to <b>Kovan Testnet</b>.',
    url: '/',
  },
  {
    id: 'homestead',
    group: 'mainnet',
    name: 'Homestead',
    fullName: 'Homestead Mainnet',
    icon: 'fas fa-globe',
    notification: 'Switched to <b>Homestead Mainnet</b>.',
    url: '/',
  }
]
if (platform.isDesktop) {
  networkList.unshift({
    id: 'dev',
    group: 'default',
    name: 'Development',
    fullName: 'Development Network',
    icon: 'fas fa-laptop-code',
    notification: 'Switched to <b>Development</b> network.',
    url: 'http://localhost:8545',
    chainId: 0,
  })
}
const networks = List(networkList)

class HeaderWithRedux extends PureComponent {
  componentDidMount () {
    actions.history = this.props.history
    headerActions.history = this.props.history
    if (!networkManager.network) {
      networkManager.setNetwork(networks.get(0))
    }
    this.navGuard = new NavGuard(this.props.history)
  }

  networkList = networksByGroup => {
    const networkList = []
    const groups = networksByGroup.toJS()
    const keys = Object.keys(groups)
    keys.forEach((key, index) => {
      if (key !== 'default') {
        networkList.push({ header: key })
      }
      groups[key].forEach(network => networkList.push(network))
      if (index !== keys.length - 1) {
        networkList.push({ divider: true })
      }
    })
    return networkList
  }

  render () {
    console.debug('[render] HeaderWithRedux')
    const { profile, projects, contracts, accounts, network } = this.props

    const selectedProject = projects.get('selected')?.toJS() || {}

    const networkGroups = networks.groupBy(n => n.group)
    const networkList = this.networkList(networkGroups)
    const selectedNetwork = networks.find(n => n.id === network) || {}

    const starred = accounts.getIn([network, 'accounts'])?.toJS() || []
    const selectedContract = contracts.getIn([network, 'selected']) || ''
    const selectedAccount = accounts.getIn([network, 'selected']) || ''

    return (
      <Header
        profile={profile}
        projects={projects.get('local').toJS()}
        selectedProject={selectedProject}
        selectedContract={selectedContract}
        selectedAccount={selectedAccount}
        starred={starred}
        network={selectedNetwork}
        networkList={networkList}
      />
    )
  }
}

export default connect([
  'profile',
  'projects',
  'contracts',
  'accounts',
  'network',
])(HeaderWithRedux)
