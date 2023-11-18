const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_ENV !== 'developed';
const isMac = process.platform === 'darwin';

//Create the main window
function createMainWindow() {

  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
  });

  //Open Dev Tools if in DEV env
  if(isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//Create About Window
function createAboutWindow() {

  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

//App is Ready
app.whenReady().then( () => {
  createMainWindow();

  //Implement Menu
  const mainMenu  = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0)
      createMainWindow();
  })
});

//Menu Template
const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac ? [{
    label: 'Help',
    submenu: [{
      label: 'About',
      click: createAboutWindow
    }]
  }] : [])
]

app.on('window-all-closed', () => {
  if(!isMac) 
    app.quit();
});