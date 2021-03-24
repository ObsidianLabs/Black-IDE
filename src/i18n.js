import merge from 'lodash/merge'
import { init as initI18n, resources as shareResources } from '@obsidians/i18n'
import { resources as ethResources } from '@obsidians/eth-i18n'

const resources = merge(shareResources, ethResources)

console.log(resources)

initI18n(resources, {
  lng: process.env.LANG || 'en',
  debug: process.env.NODE_ENV === 'development',
})
