const { app, BrowserWindow } = require('electron')
const os = require('os')
const path = require('path')
const isDev = require('electron-is-dev')
const shellPath = require('shell-path')

const { ipc } = require('@obsidians/ipc')
const { TerminalChannelManager } = require('@obsidians/terminal')

if (os.type() === 'Linux') {
  app.disableHardwareAcceleration()
}

const init = require('./init')
const createMenu = require('./createMenu')
const oldIpc = require('./ipc')

let win
let terminalChannelManager
app.on('ready', async () => {
  if (process.platform !== 'win32') {
    process.env.PATH = shellPath.sync() || [
      './node_modules/.bin',
      '/.nodebrew/current/bin',
      '/usr/local/bin',
      process.env.PATH
    ].join(':')
  }

  terminalChannelManager = new TerminalChannelManager()
  init()
  ipc.window = createWindow()
  createMenu()
})

function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 820,
    minHeight: 600,
    backgroundColor: '#2e2e32',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    }
  })

  win.webContents.setWindowOpenHandler(() => {
    // TODO: need add condition for the external link in the code editor
    return { action: 'deny' }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../index.html')}`
  )
  win.on('closed', () => {
    terminalChannelManager.stopAll()
    ipc.window = null
    win = null
    oldIpc.setWindow()
  })
  oldIpc.setWindow(win)
  return win
}

app.on('activate', () => {
  if (win === null) {
    ipc.window = createWindow()
  }
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
