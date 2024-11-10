const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

process.env.NODE_ENV = 'development';

const inDevMode = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: inDevMode,
    width: 500,
    height: 600,
  });

  mainWindow.loadFile('./app/index.html');
};

const menu = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+W',
        click: () => app.quit(),
      },
    ],
  },
];

app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
  globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
    mainWindow.toggleDevTools()
  );

  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
