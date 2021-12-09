import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
	send: (channel: string, args?: any) => {
		const VALID_CHANNELS = ['toMain-version'];

		if (VALID_CHANNELS.includes(channel)) {
			ipcRenderer.send(channel, args);
		}
	},
	receive: (channel: string, func?: (...args: any) => void) => {
		const VALID_CHANNELS = ['fromMain-updates', 'fromMain-version'];

		if (VALID_CHANNELS.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
