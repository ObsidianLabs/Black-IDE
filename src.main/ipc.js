const { ipcMain } = require('electron')

let window
exports.setWindow = win => {
  window = win
}

exports.getWindow = () => window

exports.send = (channel, msg) => {
  if (window) {
    window.webContents.send(channel, msg)
  }
}

const cbs = {}
function clearListener (channel) {
  if (cbs[channel]) {
    ipcMain.removeListener(channel, cbs[channel])
    cbs[channel] = undefined
  }
}

exports.on = (channel, cb) => {
  clearListener(channel)
  ipcMain.on(channel, cb)
}

exports.off = channel => clearListener(channel)
