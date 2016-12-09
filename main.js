const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

const path = require('path');
const url = require('url');

var mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({width: 300, height: 700});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    const reg = globalShortcut.register('MediaPlayPause', () => {
        mainWindow.webContents.executeJavaScript('playpause()');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})

app.on('activate', () => {
    if(win === null) {
        createWindow()
    }
});
