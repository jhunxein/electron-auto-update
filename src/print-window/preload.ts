import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
	send: (channel: string) => {
		const VALID_CHANNELS = ['toMain-print-file', 'toMain-start-printing'];
		if (VALID_CHANNELS.includes(channel)) {
			ipcRenderer.send(channel);
		}
	},
	receive: (channel: string, func?: (...args: any) => void) => {
		const VALID_CHANNELS = ['fromMain-load-file', 'fromMain-start-printing'];
		if (VALID_CHANNELS.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
