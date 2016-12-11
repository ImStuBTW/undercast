const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const webContents = electron.webContents;
const remote = electron.remote;
const Menu = electron.Menu;
const menubar = require('menubar');

const path = require('path');
const url = require('url');

//var opts = {dir: __dirname, icon: path.join(__dirname, 'images', 'Icon.png')}
var opts = {icon: 'white.png', width: 300, height: 400, preloadWindow: true}
var mb = menubar(opts);

var keysBound = true;
var indicator = true;
var isPlaying = false;

global.playing = function() {
    if(indicator) {
        mb.tray.setImage('orange.png');
    }
    isPlaying = true;
}

global.paused = function() {
    if(indicator) {
        mb.tray.setImage('white.png');
    }
    isPlaying = false;
}

const rcMenuTemplate = [
    {
        label: 'Bind Media Keys',
        type: 'checkbox',
        checked: keysBound,
        click () {
            if(keysBound) {
                unregisterKeys();
            }
            else {
                registerKeys();
            }
            keysBound = !keysBound;
        }
    },
    {
        label: 'Show Playing Indicator',
        type: 'checkbox',
        checked: indicator,
        click () {
            if(indicator) {
                mb.tray.setImage('white.png');
            }
            else {
                if(isPlaying) {
                    mb.tray.setImage('orange.png');
                }
            }
            indicator = !indicator;
        }
    },
    {
        label: 'Quit',
        click () { mb.app.quit(); }
    }
];

const rcMenu = Menu.buildFromTemplate(rcMenuTemplate);

var registerKeys = function () {
    const reg = globalShortcut.register('MediaPlayPause', () => {
        //console.log('Play');
        mb.window.webContents.executeJavaScript('playpause()');
    });
    const regStop = globalShortcut.register('MediaStop', () => {
        //console.log('Stop');
        mb.window.webContents.executeJavaScript('stop()');
    });
    const regNext = globalShortcut.register('MediaNextTrack', () => {
        //console.log('Next');
        mb.window.webContents.executeJavaScript('next()');
    });
    const regPrevious = globalShortcut.register('MediaPreviousTrack', () => {
        //console.log('Previous');
        mb.window.webContents.executeJavaScript('previous()');
    });
};

var unregisterKeys = function() {
    globalShortcut.unregisterAll();
};

mb.on('ready', function () {
    mb.showWindow();
});

mb.on('after-create-window', function () {
    registerKeys();
    mb.tray.on('right-click', function(){
        mb.tray.popUpContextMenu(rcMenu);
    });
});

mb.app.on('will-quit', function() {
  unregisterKeys();
});
