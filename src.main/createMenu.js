const os = require('os')
const { app, Menu, shell, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const ipc = require('./ipc')

module.exports = function createMenu () {
  const application = {
    label: 'Application',
    submenu: [
      { label: 'About', click: () => ipc.send('menu-click', 'about') },
      { type: 'separator' },
      {
        label: 'Clear All App Data...',
        click: async () => {
          const { response } = await dialog.showMessageBox({
            type: 'question',
            buttons: ['Confirm', 'Cancel'],
            defaultId: 1,
            message: 'All your data will be lost. Are you sure to continue?',
            cancelId: 1
          })
          if (response === 0) { // confirm
            const window = ipc.getWindow()
            if (window) {
              const session = window.webContents.session
              await session.clearStorageData()
              window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`)
            }
          }
        }
      },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
    ]
  }

  const file = {
    label: 'File',
    submenu: [
      {
        label: 'New Project...',
        accelerator: 'CmdOrCtrl+Shift+N',
        click: () => ipc.send('menu-click', 'project.newProject')
      },
      {
        label: 'Open Project...',
        accelerator: 'CmdOrCtrl+Shift+O',
        click: () => ipc.send('menu-click', 'project.openProject')
      },
      { type: 'separator' },
      {
        label: 'New File...',
        accelerator: 'CmdOrCtrl+N',
        click: () => ipc.send('menu-click', 'project.newFile')
      },
      {
        label: 'New Folder...',
        accelerator: 'CmdOrCtrl+Option+N',
        click: () => ipc.send('menu-click', 'project.newFolder')
      },
      { type: 'separator' },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => ipc.send('menu-click', 'project.save')
      },
      {
        label: 'Save All',
        accelerator: 'CmdOrCtrl+Option+S',
        click: () => ipc.send('menu-click', 'project.saveAll')
      }
    ]
  }

  const edit = {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: () => ipc.send('menu-click', 'project.undo')
      },
      {
        label: 'Redo',
        accelerator: 'CmdOrCtrl+Shift+Z',
        click: () => ipc.send('menu-click', 'project.redo')
      },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      {
        label: 'Delete',
        click: () => ipc.send('menu-click', 'project.delete')
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        click: () => ipc.send('menu-click', 'project.selectAll')
      }
    ]
  }

  const view = {
    label: 'View',
    submenu: [
      { label: 'Open Console', accelerator: 'Ctrl+`', click: () => ipc.send('menu-click', 'project.openTerminal') },
      { type: 'separator' },
      { label: 'Increase Font Size', role: 'zoomin' },
      { label: 'Decrease Font Size', role: 'zoomout' },
      { label: 'Reset to Actual Size', role: 'resetzoom' }
    ]
  }


  const debug = {
    label: 'Debug',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' }
    ]
  }

  const template = [
    file,
    edit,
    view,
  ]

  if (os.type() === 'Darwin') {
    template.unshift(application)
  } else {
    template.push(application)
  }

  // template.push(debug)
  isDev && template.push(debug)

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
