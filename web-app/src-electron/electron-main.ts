import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import os from 'os';
import * as pty from 'node-pty';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;
let shellProcess = undefined as undefined | pty.IPty;

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
  });
}

app.whenReady().then(createWindow);

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
  /*
  if(!shellProcess.stdout || !shellProcess.stderr)
    return
  // Handle the data event for standard output
  shellProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    mainWindow?.webContents.send('stdout', data.toString());
  });

// Handle the data event for standard error
  shellProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    mainWindow?.webContents.send('stdout', data.toString());
  });*/
});

// Handle an IPC event from renderer
ipcMain.on('message-from-renderer', (event, args) => {
  console.log('Received from renderer:', args);
  if(!shellProcess) {
    console.warn('shell process is undefined')
    return
  }
  shellProcess.write(`${args}`);

});
