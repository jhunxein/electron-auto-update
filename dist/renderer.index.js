api.send('toMain-version');
api.receive('fromMain-version', function (version) {
    document.getElementById('version').textContent = version && version.toString();
});
api.receive('fromMain-updates', function (args) {
    console.log(args);
});
//# sourceMappingURL=renderer.index.js.map