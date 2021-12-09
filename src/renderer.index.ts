api.send('toMain-version');

api.receive('fromMain-version', (version: string) => {
	document.getElementById('version').textContent = version.toString();
});

api.receive('fromMain-updates', (args) => {
	console.log(args);
});
