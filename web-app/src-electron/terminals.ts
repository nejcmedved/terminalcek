import {TerminalcekType} from 'app/src-electron/electron-main';

export interface TerminalProperties {
  href: string,
  cmd: string
}

export interface TerminalElement {
  label: string
  id: string,
  terminal_type: TerminalcekType,
  props: TerminalProperties
}
