const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
     webPreferences: {
      preload: path.join(__dirname, 'preload.js')
     }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then( () => {
  
  ipcMain.on('set-title', (event,title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  createWindow()
  
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})
