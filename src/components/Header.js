import React, { PureComponent } from 'react'

import { connect } from '@obsidians/redux'
import { IpcChannel } from '@obsidians/ipc'

import headerActions, { Header, NavGuard } from '@obsidians/header'
import { networkManager } from '@obsidians/network'
import { actions } from '@obsidians/workspace'
import keypairManager from '@obsidians/keypair'

import { List } from 'immutable'

import EthSdk, { kp } from '@obsidians/eth-sdk'
import BscSdk from '@obsidians/bsc-sdk'

keypairManager.kp = kp
networkManager.addSdk(EthSdk, EthSdk.networks)
networkManager.addSdk(BscSdk, BscSdk.networks)
networkManager.addSdk(EthSdk, EthSdk.customNetworks)

class HeaderWithRedux extends PureComponent {
  state = {
    networkList: List(),
    interval: null
  }

  componentDidMount () {
    actions.history = this.props.history
    headerActions.history = this.props.history
    this.refresh()
    this.navGuard = new NavGuard(this.props.history)
  }

  async refresh() {
    if (process.env.DEPLOY === 'bsn') {
      this.getNetworks()
      clearInterval(this.state.interval)
      const interval = setInterval(() => this.getNetworks(), 5 * 6 * 1000)
      this.setState({ interval })
    } else {
      this.setState({ networkList: List(networkManager.networks) }, this.setNetwork)
    }
  }

  async getNetworks () {
    try {
      const ipc = new IpcChannel('bsn')
      const projects = await ipc.invoke('projects', { chain: 'eth' })
      this.setState({
        networkList: List(projects.map(project => {
          const url = project.endpoints?.find(endpoint => endpoint.startsWith('http'))
          return {
            id: `bsn${project.network.id}`,
            group: 'BSN',
            name: `${project.network.name}`,
            fullName: `${project.network.name} - ${project.name}`,
            icon: 'fas fa-globe',
            notification: `Switched to <b>${project.network.name}</b>.`,
            url,
            chainId: project.id
          }
        }))
      }, this.setNetwork)
    } catch (error) {
      this.setState({ networkList: List() })
    }
  }

  setNetwork () {
    if (!networkManager.network) {
      networkManager.setNetwork(this.state.networkList.get(0))
    }
  }

  groupedNetworks = networksByGroup => {
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
    const { uiState, profile, projects, contracts, accounts, network } = this.props

    const selectedProject = projects.get('selected')?.toJS() || {}

    const networkGroups = this.state.networkList.groupBy(n => n.group)
    const groupedNetworks = this.groupedNetworks(networkGroups)
    const selectedNetwork = this.state.networkList.find(n => n.id === network) || {}

    const browserAccounts = uiState.get('browserAccounts') || []
    const starred = accounts.getIn([network, 'accounts'])?.toJS() || []
    const starredContracts = contracts.getIn([network, 'starred'])?.toJS() || []
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
        starredContracts={starredContracts}
        browserAccounts={browserAccounts}
        network={selectedNetwork}
        networkList={groupedNetworks}
      />
    )
  }
}

export default connect([
  'uiState',
  'profile',
  'projects',
  'contracts',
  'accounts',
  'network',
])(HeaderWithRedux)
