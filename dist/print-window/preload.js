"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    send: function (channel) {
        var VALID_CHANNELS = ['toMain-print-file', 'toMain-start-printing'];
        if (VALID_CHANNELS.includes(channel)) {
            electron_1.ipcRenderer.send(channel);
        }
    },
    receive: function (channel, func) {
        var VALID_CHANNELS = ['fromMain-load-file', 'fromMain-start-printing'];
        if (VALID_CHANNELS.includes(channel)) {
            electron_1.ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    }
});
//# sourceMappingURL=preload.js.map