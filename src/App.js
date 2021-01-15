import React, { Suspense, lazy } from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import platform from '@obsidians/platform'
import { LoadingScreen } from '@obsidians/ui-components'
import Auth from '@obsidians/auth'

const Router = platform.isDesktop ? HashRouter : BrowserRouter
const ReduxApp = lazy(() => import('./ReduxApp' /* webpackChunkName: "components" */))

export default function App () {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path='/callback' render={props => {
            Auth.handleCallback(props)
            return <LoadingScreen text='Logging in...' />
          }}/>
          <Route component={ReduxApp} />
        </Switch>
      </Suspense>
    </Router>
  )
}
