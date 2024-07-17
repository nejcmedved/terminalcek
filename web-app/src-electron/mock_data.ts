import {BrowserWindow} from 'electron';
import {CustomMenuItem, CustomMenuItemContstructorOptions, TerminalcekType} from 'app/src-electron/electron-main';
import path from 'path';
import {nativeImage} from 'electron'
import {Workspace} from 'app/src-electron/workspace';

export function getMockWorkSpaces() {
  const workspaces = [
    {
      label: 'Home',
      id: '1'
    },
    {
      label: 'Work',
      id: '1'
    }
  ] as Array<Workspace>
  return workspaces;
}

export function getMockMenu(click_function: (menuItem: CustomMenuItem, browserWindow: BrowserWindow | undefined, event?: Electron.KeyboardEvent) => unknown): (Array<CustomMenuItemContstructorOptions>) {
  return [
    {
      label: 'Google.com',
      type: 'normal',
      click: click_function,
      href: 'https://www.google.com',
      terminal_type: TerminalcekType.WEBSITE,
      icon: nativeImage.createFromPath(path.resolve(__dirname, 'icons/chrome.png')).resize({height: 18, width: 18})
    },
    {
      label: 'Asist.si',
      type: 'normal',
      click: click_function,
      href: 'https://www.asist.si',
      terminal_type: TerminalcekType.WEBSITE
    },
    {
      label: 'CUVP UrbanNest',
      type: 'normal',
      click: click_function,
      href: 'https://www.asist.si',
      terminal_type: TerminalcekType.SSH
    },
    {
      label: 'Local terminal',
      type: 'normal',
      click: click_function,
      terminal_type: TerminalcekType.SSH,
      icon: nativeImage.createFromPath(path.resolve(__dirname, 'icons/terminal2.png')).resize({height: 18, width: 18})
    },
  ]
}
