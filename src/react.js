import React from 'react'
import ReactDOM from 'react-dom'

import platform from '@obsidians/platform'
import fileOps from '@obsidians/file-ops'

import './scss/index.scss'
import './i18n'

import * as serviceWorker from './serviceWorker'
import App from './App'

if (platform.isDesktop) {
  fileOps.fsType = 'electron'
} else {
  fileOps.fsType = 'web'
}

if (!process.env.CDN) {
  import('./scss/fonts/open_sans/open_sans.css')
  import('./scss/fonts/hack/hack.css')
  import('./scss/fonts/fira/fira_code.css')
  import('@fortawesome/fontawesome-pro/js/all')
}

document.title = process.env.PROJECT_NAME
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
