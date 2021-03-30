import merge from 'lodash/merge'
import { init as initI18n, i18n, resources as shareResources } from '@obsidians/i18n'
import { resources as ethResources } from '@obsidians/eth-i18n'

const resources = merge(shareResources, ethResources)

initI18n(resources, {
  lng: process.env.LANG || 'en',
  // debug: process.env.NODE_ENV === 'development',
})

// TODO: store language setting in localStorage, and init with this value
// i18n.on('languageChanged', (lng) => {
//   localStorage.setItem('language', lng)
//   window.location.reload()
// })
