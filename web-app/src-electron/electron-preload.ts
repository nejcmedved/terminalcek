import { contextBridge, ipcRenderer } from 'electron';

// Define a type for the exposed API
interface ElectronAPI {
    send: (channel: string, data: unknown) => void;
    receive: (channel: string, func: (...args: unknown[]) => void) => void;
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const electronAPI: ElectronAPI = {
    send: (channel: string, data: unknown) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel: string, func: (...args: unknown[]) => void) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
};

contextBridge.exposeInMainWorld('electron', electronAPI);
