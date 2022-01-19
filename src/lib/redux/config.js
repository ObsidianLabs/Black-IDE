import Immutable, { List, Map } from 'immutable'

export { redux as profile } from '@obsidians/auth'
export { redux as projects } from '@obsidians/workspace'
export { redux as keypairs } from '@obsidians/keypair'
export { redux as tokens } from '@obsidians/explorer'
export { redux as abis } from '@obsidians/eth-sdk'
export { redux as customNetworks } from '@obsidians/eth-network'
export { redux as queue } from '@obsidians/queue'

export const version = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    SET_VERSION: {
      reducer: (state, { payload }) => state.merge(payload)
    }
  }
}

export const globalConfig = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    UPDATE_GLOBAL_CONFIG: {
      reducer: (state, { payload }) => state.mergeDeep(payload)
    },
  }
}

export const uiState = {
  default: Immutable.fromJS({}),
  persist: false,
  actions: {
    UPDATE_UI_STATE: {
      reducer: (state, { payload }) => state.merge(payload)
    },
  }
}

export const contracts = {
  default: Immutable.fromJS({
    dev: {
      selected: '',
      tabs: [],
      starred: [],
    },
    testnet: {
      selected: '',
      tabs: [],
      starred: [],
    },
  }),
  persist: true,
  actions: {
    CREATE_TABS: {
      reducer: state => state
        .updateIn(['dev', 'tabs'], (tabs = List([])) => tabs)
    },
    SET_CONTRACT_TABS: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'tabs'], Immutable.fromJS(payload.tabs))
    },
    SELECT_CONTRACT: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'selected'], payload.contract)
    },
    SET_STARRED_CONTRACTS: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'starred'], List(payload.starred))
    },
  }
}

export const accounts = {
  default: Immutable.fromJS({
    dev: {
      loading: false,
      selected: '',
      accounts: [],
      tabs: [],
    },
    testnet: {
      loading: false,
      selected: '',
      accounts: [],
      tabs: [],
    }
  }),
  persist: true,
  actions: {
    CREATE_TABS: {
      reducer: state => state
        .updateIn(['dev', 'tabs'], (tabs = List([])) => tabs)
    },
    SET_ACCOUNT_TABS: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'tabs'], Immutable.fromJS(payload.tabs))
    },
    SET_STARRED: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'accounts'], List(payload.starred))
    },
    SELECT_ACCOUNT: {
      reducer: (state, { payload }) => state.setIn([payload.network, 'selected'], payload.account)
    },
    REMOVE_ACCOUNT: {
      reducer: (state, { payload }) => {
        let index = state.getIn([payload.network, 'accounts']).indexOf(payload.account)
        if (index === -1) {
          return state
        }
        return state.updateIn([payload.network, 'accounts'], data => data.remove(index))
      }
    },
  }
}

export const network = {
  default: '',
  persist: false,
  actions: {
    SELECT_NETWORK: {
      reducer: (_, { payload }) => payload
    }
  }
}

export const chainList = {
  default: Immutable.fromJS({
    networks: [],
  }),
  persist: false,
  actions: {
    SET_CHAIN_LIST: {
      reducer: (state, { payload }) => state.setIn(['networks'], Immutable.fromJS(payload)),
    },
  },
}
