

import { app, protocol, BrowserWindow, ipcMain} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
const regedit = require('regedit');
regedit.setExternalVBSLocation('resources/regedit/vbs');
const ini = require('ini');
const isDevelopment = process.env.NODE_ENV !== 'production';
import { autoUpdater } from "electron-updater";

// require('update-electron-app')();

// require('update-electron-app')();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function enableAPI(lolDir: string) {
  const paths = ['/Config/game.cfg', '/Game/Config/game.cfg', 'DATA/CFG/game.cfg'];
  paths.forEach(function (value: string) {
    let lolPath = lolDir + value;
    if(existsSync(lolPath) == true) {
      let config = ini.parse(readFileSync(lolPath, 'utf-8'));
      config.General.EnableReplayApi = 1;
      writeFileSync(lolPath, ini.stringify(config, { section: 'General' }));
      
      console.log(`Updated ${lolPath}`);
    } else {
      // console.log('file not found');
    }
  })
}

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 310,
    // minWidth: 400,
    minWidth: 310,
    height: 627,
    // minHeight: 627,
    frame: false,
    webPreferences: {
      // 'web-security': false,
      webSecurity: false,
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // @ts-ignore: Unreachable code error
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })


  ipcMain.on('close-player', ()=> {
    console.log('now closing');
    win.close();
    
  })

  win.setMenuBarVisibility(false);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  if(process.platform == 'win32') {
    regedit.list('HKLM\\SOFTWARE\\WOW6432Node\\Riot Games, Inc', function(err: any, result: any) {
      // this logic was not tested because I couldn't find the registry.
      for(let key in result) {
        for(let vk in result[key].values) {
          if(vk.endsWith('/Location')) {
            let lolDir = path.dirname(result[key].values[vk]);
            if(existsSync(lolDir)) {
              enableAPI(lolDir);
            }
          }
        }
      }
    });

    regedit.list('HKCU\\Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\MuiCache', function(err: any, result: any) {
      for(let key in result) {
        for(let vk in result[key].values) {
          if(vk.includes('LeagueClient.exe')) {
            let lolDir = path.dirname(vk);
            if(existsSync(lolDir)) {
              enableAPI(lolDir);
            }
          }
        }
      }
    });
  } else if(process.platform == 'darwin') {

  }
}

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

// app.allowRendererProcessReuse = false

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('needs to quit');
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   console.log('gone in here');
  //   app.quit()
  // }
  app.quit();
})



app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

    // app.allowRendererProcessReuse = false;
  }


  createWindow();

    // ipcMain.on('resize', (event, arg) => {
    //   console.log('askdjbfsdf');
      
    // })
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
