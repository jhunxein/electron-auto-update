"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
var electron_updater_1 = require("electron-updater");
// app windows
var mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        minHeight: 600,
        minWidth: 1000,
        center: true,
        title: 'NTP Monitoring',
        show: false,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            devTools: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile((0, path_1.join)(__dirname, '../public/index.html'));
    // hide menu bar
    mainWindow.menuBarVisible = false;
    mainWindow.once('ready-to-show', function () {
        mainWindow.show();
    });
    mainWindow.once('close', function () {
        electron_1.app.quit();
    });
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', function () {
    createWindow();
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
/**
 *
 * Custom Events
 *
 */
electron_updater_1.autoUpdater.on('checking-for-update', function (info) {
    mainWindow.webContents.send('fromMain-updates', info);
});
electron_updater_1.autoUpdater.on('update-available', function (info) {
    mainWindow.webContents.send('fromMain-updates', info);
});
electron_updater_1.autoUpdater.on('update-not-available', function (info) {
    mainWindow.webContents.send('fromMain-updates', info);
});
electron_updater_1.autoUpdater.on('error', function (err) {
    mainWindow.webContents.send('fromMain-updates', err);
});
electron_updater_1.autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('fromMain-updates', progressObj);
});
electron_updater_1.autoUpdater.on('update-downloaded', function (info) {
    mainWindow.webContents.send('fromMain-updates', info);
    electron_updater_1.autoUpdater.quitAndInstall();
});
electron_1.ipcMain.on('toMain-version', function (event) {
    event.reply('fromMain-version', electron_1.app.getVersion());
});
//# sourceMappingURL=index.js.map