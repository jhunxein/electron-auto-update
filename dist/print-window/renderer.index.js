api.receive('fromMain-load-file', function (path) {
    var imgViewer = document.getElementById('img-viewer');
    imgViewer.src = path;
    if (imgViewer.src) {
        api.send('toMain-start-printing');
    }
});
//# sourceMappingURL=renderer.index.js.map