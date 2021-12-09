/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { join } from 'path';
import ADODB = require('node-adodb');
import { autoUpdater } from 'electron-updater';

const app_settings: ISettings = { path: '', adodb: '', allotmenttype: '' };

const isDev = process.env.NODE_ENV === 'development' ? true : false;
if (isDev) {
	try {
		require('electron-reloader')(module, {
			debug: true,
			ignore: [
				'dist/*',
				'*.json',
				'out/*',
				'out',
				'dist',
				'eng.traineddata',
				'build/*',
				'db/*',
			],
			watchRenderer: true,
		});
	} catch (error) {
		ipcRenderer.send('fromMain-errors');
	}
}

// app windows
let mainWindow: BrowserWindow;
let printWindow: BrowserWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = (): void => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minHeight: 600,
		minWidth: 1000,
		center: true,
		title: 'NTP Monitoring',
		show: false,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
			devTools: true,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(join(__dirname, '../public/index.html'));

	// hide menu bar
	mainWindow.menuBarVisible = false;

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.once('close', () => {
		app.quit();
	});

	isDev && mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();

	autoUpdater.checkForUpdatesAndNotify();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
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

autoUpdater.on('checking-for-update', (info) => {
	mainWindow.webContents.send('fromMain-updates', info);
});
autoUpdater.on('update-available', (info) => {
	mainWindow.webContents.send('fromMain-updates', info);
});
autoUpdater.on('update-not-available', (info) => {
	mainWindow.webContents.send('fromMain-updates', info);
});
autoUpdater.on('error', (err) => {
	mainWindow.webContents.send('fromMain-updates', err);
});
autoUpdater.on('download-progress', (progressObj) => {
	mainWindow.webContents.send('fromMain-updates', progressObj);
});
autoUpdater.on('update-downloaded', (info) => {
	mainWindow.webContents.send('fromMain-updates', info);
	autoUpdater.quitAndInstall();
});

ipcMain.on('toMain-version', (event) => {
	event.reply('fromMain-version', process.env.npm_package_version);
});
