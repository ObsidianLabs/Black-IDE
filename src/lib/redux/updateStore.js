export default function ({ persistor, store, actions }) {
  // Data initialization
  store.dispatch(actions.CREATE_TABS())
  store.dispatch(actions.ADD_DEFAULT_ABIS())

  // Important Note:
  // data structure upgrade must be called before data version upgrade

  // Data structure upgrade
  // store.dispatch(actions.__UPGRADE_DATA())

  // Data version upgrade
  // store.dispatch(actions.__UPGRADE_VERSION())
}
