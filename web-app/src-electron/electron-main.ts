import {app, BrowserWindow, ipcMain, Tray, Menu} from 'electron';
import path from 'path';
import os from 'os';
import * as pty from 'node-pty';
import { shell } from 'electron/common';
import {getMockMenu, getMockWorkSpaces} from './mock_data';
import {TerminalcekDb} from 'app/src-electron/db';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;
let shellProcess = undefined as undefined | pty.IPty;
let tray = null;
const db = new TerminalcekDb()

export enum TerminalcekType {
  SSH,
  WEBSITE,
  SERIAL
}

export interface CustomMenuItem extends Electron.MenuItem {
  href?: string | undefined; // Add any custom properties you need
}

export interface CustomMenuItemContstructorOptions extends Electron.MenuItemConstructorOptions {
  href?: string | undefined; // Add any custom properties you need
  terminal_type: TerminalcekType
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
    db.closedb()
  });
}

function onClick(menuItem: CustomMenuItem, browserWindow: BrowserWindow | undefined, event?: Electron.KeyboardEvent) {
  console.log(`Menu item click MenuItem: ${menuItem.label}, BrowserWindow: ${browserWindow ? browserWindow.id : 'undefined'}, Event: ${event}`);
  if(menuItem.href) {
    console.log('opening browser ', menuItem.href)
    shell.openExternal(menuItem.href)
  }
}

app.whenReady().then(() => {
  createWindow()
  tray = new Tray(path.resolve(__dirname, 'icons/icon.png'))
  const contextMenu = Menu.buildFromTemplate(
    getMockMenu(onClick)
  )
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.addListener('double-click', () => {
    return
  });
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

ipcMain.on('start-shell', () => {
  console.log('starting shell process')
  const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';
  shellProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
  });
  shellProcess.onData(recv => mainWindow?.webContents.send('stdout', recv));
});

ipcMain.on('load-main-data-req', () => {
  console.log('loading main app data')
  const data = {
    workspaces: getMockWorkSpaces()
  }
  mainWindow?.webContents.send('load-main-data-resp', data)
});

// Handle an IPC event from renderer
ipcMain.on('message-from-renderer', (event, args) => {
  console.log('Received from renderer:', args);
  if (!shellProcess) {
    console.warn('shell process is undefined')
    return
  }
  shellProcess.write(`${args}`);

});

// Handle an IPC event from renderer
ipcMain.on('workspace', (event, args) => {
  console.log('Received from workspace :', args);
});
