import React, { Component, Suspense, lazy } from 'react'

import fileOps from '@obsidians/file-ops'
import Auth from '@obsidians/auth'
import { NotificationSystem } from '@obsidians/notification'
import Welcome, { checkDependencies } from '@obsidians/welcome'
import { GlobalModals, autoUpdater } from '@obsidians/global'
import { LoadingScreen } from '@obsidians/ui-components'
import redux, { Provider } from '@obsidians/redux'
import { t } from '@obsidians/i18n'

import { config, updateStore } from '@/redux'
import '@/menu'

import Routes from './components/Routes'
import icon from './components/icon.png'
const Header = lazy(() => import('./components/Header' /* webpackChunkName: "components" */))

export default class ReduxApp extends Component {
  state = {
    loaded: false,
    dependencies: false
  }

  async componentDidMount () {
    await redux.init(config, updateStore).then(onReduxLoaded)
    this.refresh()
  }

  refresh = async () => {
    const dependencies = await checkDependencies()
    this.setState({ loaded: true, dependencies })
    autoUpdater.check()
  }

  skip = () => {
    this.setState({ loaded: true, dependencies: true })
  }

  render () {
    if (!this.state.loaded) {
      return <LoadingScreen text={t('loading')}/>
    }

    if (!this.state.dependencies) {
      return (
        <Suspense fallback={<LoadingScreen text={t('loading')}/>}>
          <Welcome
            isReady={checkDependencies}
            onGetStarted={this.skip}
            truffleSubtitle={`The library used to create and compile a project.`}
          />
          <NotificationSystem />
          <GlobalModals icon={icon} />
        </Suspense>
      )
    }

    return (
      <Provider store={redux.store}>
        <div
          className='body'
          style={{ paddingTop: this.state.dependencies ? '49px' : '0' }}
        >
          <Routes>
            <Header history={this.props.history} />
            <NotificationSystem />
            <GlobalModals icon={icon} />
          </Routes>
        </div>
      </Provider>
    )
  }
}

async function onReduxLoaded () {
  Auth.updateProfile()
  const version = fileOps.current.getAppVersion()
  redux.dispatch('SET_VERSION', { version })
}
