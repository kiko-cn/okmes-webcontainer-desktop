import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './windows'
import './ipc'
import global from './global'
import socket from './socket'

// 防止应用重复启动
// const lock = app.requestSingleInstanceLock({
//   key: 'OkMesWebContainer'
// })

// if (!lock) {
//   return
// }

socket.init()

global.ensureInitialized()

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.sunpn')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  createWindow()
})

// 开机自启
// if (import.meta.env.MODE !== 'development') {
//   app.setLoginItemSettings({
//     openAtLogin: true
//   })
// }

// const options = app.getLoginItemSettings()
// console.log(options)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
