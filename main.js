// Electron Declarations.
const { app, shell, BrowserWindow, globalShortcut, webContents, remote, Menu } = require('electron');
const { menubar } = require('menubar');
const defaultMenu = require('electron-default-menu');
const windowStateKeeper = require('electron-window-state');

// Helper Functions.
const path = require('path');
const url = require('url');

// Declare Menubar and Options.
// TODO: Use iconTemplate.png on macOS, white.png on Windows.
var options = {
    icon: path.join(__dirname, 'iconTemplate.png'),
    showOnAllWorkspaces: false,
    preloadWindow: true,
    browserWindow: {
        width: 300, height: 425,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        }
    }
};

// Main menubar instance. Uses the above options. Defaults to opening ./index.html
var mb = menubar(options);

// Options Variables.
var keysBound = true;
var indicator = true;
var isPlaying = false;

// Global functions can be triggered by Javascript in the rendered index.html page.

// Playing sets the icon orange if the playing indicator is turned on.
// Playing state is determined by 'media-started-playing' event.
global.playing = function() {
    if(indicator) {
        mb.tray.setImage(path.join(__dirname, 'orange.png'));
    }
    isPlaying = true;
}

// Paused sets the icon white if the playing indicator is turned on.
// Pause state is determined by 'media-paused' event.
global.paused = function() {
    if(indicator) {
        mb.tray.setImage(path.join(__dirname, 'iconTemplate.png'));
    }
    isPlaying = false;
}

// Right Click Menu Template
// Bind Media Keys toggles global media key controls.
// Show Playing Indicator changes menu icon based on playing state.
// Quit quits. Obviously.
const rcMenuTemplate = [
    {
        label: 'Show Playing Indicator',
        type: 'checkbox',
        checked: indicator,
        click () {
            if(indicator) {
                mb.tray.setImage(path.join(__dirname, 'iconTemplate.png'));
            }
            else {
                if(isPlaying) {
                    mb.tray.setImage(path.join(__dirname, 'orange.png'));
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

// Create right click menu.
const rcMenu = Menu.buildFromTemplate(rcMenuTemplate);

// Create global media key shortcuts.
var registerKeys = function () {
    const reg = globalShortcut.register('MediaPlayPause', () => {
        // Media keys trigger javascript functions in the index.html file.
        mb.window.webContents.executeJavaScript('playpause()');
    });
    const regStop = globalShortcut.register('MediaStop', () => {
        mb.window.webContents.executeJavaScript('stop()');
    });
    const regNext = globalShortcut.register('MediaNextTrack', () => {
        mb.window.webContents.executeJavaScript('next()');
    });
    const regPrevious = globalShortcut.register('MediaPreviousTrack', () => {
        mb.window.webContents.executeJavaScript('previous()');
    });
};

// Unregister media keys.
var unregisterKeys = function() {
    globalShortcut.unregisterAll();
};

// Show window when the app first runs.
// A 1ms delay is required to fix a bug causing the window to disappear after spawning.
mb.on('ready', function ready () {
    // Load previous window size with fallback to default.
    let mainWindowState = windowStateKeeper({
        defaultWidth: 300,
        defaultHeight: 425
    });
    // Let windowStateKeeper manage menubar window resizing callbacks.
    mainWindowState.manage(mb.window);
    // Window size has already been initialized with the menubar default options.
    // Update menubar window with the saved window size.
    mb.window.setSize(mainWindowState.width, mainWindowState.height);

    // Get template for default menu
    const menu = defaultMenu(app, shell);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
    setTimeout(function(){mb.showWindow();},1);
})

// Register the media keys and tray menu once the app starts.
mb.on('after-create-window', function () {
    registerKeys();
    mb.tray.on('right-click', function(){
        mb.tray.popUpContextMenu(rcMenu);
    });
});

// Unregister media keys upon exit.
mb.app.on('will-quit', function() {
  unregisterKeys();
});
