api.receive('fromMain-load-file', (path: string) => {
	const imgViewer = document.getElementById('img-viewer') as HTMLImageElement;
	imgViewer.src = path;

	if (imgViewer.src) {
		api.send('toMain-start-printing');
	}
});
