import {BrowserWindow} from 'electron';
import {CustomMenuItem, CustomMenuItemContstructorOptions, TerminalcekType} from 'app/src-electron/electron-main';

export function getMockMenu(click_function: (menuItem: CustomMenuItem, browserWindow: BrowserWindow | undefined, event?: Electron.KeyboardEvent) => unknown): (Array<CustomMenuItemContstructorOptions>) {
  return [
    {label: 'Google.com', type: 'normal', click: click_function, href: 'https://www.google.com', terminal_type: TerminalcekType.WEBSITE},
    {label: 'Asist.si', type: 'normal', click: click_function, href: 'https://www.asist.si', terminal_type: TerminalcekType.WEBSITE},
    {label: 'CUVP UrbanNest', type: 'normal', click: click_function, href: 'https://www.asist.si', terminal_type: TerminalcekType.SSH},
  ]
}
