const { app, BrowserWindow, Menu } = require('electron');

process.env.NODE_ENV = 'development';

const inDevMode = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

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

const createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    title: 'About ImageShrink',
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: inDevMode,
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile('./app/about.html');
};

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About ImageShrink',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About ImageShrink',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(inDevMode
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'seperator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : {}),
];

app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

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
