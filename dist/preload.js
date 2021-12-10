"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    send: function (channel, args) {
        var VALID_CHANNELS = ['toMain-version'];
        if (VALID_CHANNELS.includes(channel)) {
            electron_1.ipcRenderer.send(channel, args);
        }
    },
    receive: function (channel, func) {
        var VALID_CHANNELS = ['fromMain-updates', 'fromMain-version'];
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