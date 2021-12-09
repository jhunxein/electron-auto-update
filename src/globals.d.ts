declare namespace api {
	function send(channel: string, params?: any): void;
	function receive(channel: string, params?: any): void;
}

// settings
// future development

type ISettingsQuery = {
	value: string;
};

interface ISettings {
	path?: string;
	adodb?: string;
	allotmenttype?: string;
	adodbpwd?: string;
}

interface IStatus<T = undefined> {
	status: 'ok' | 'error';
	content?: T;
	nodeid?: string;
}

interface IParseFile {
	mainfolder_id: number;
	subfoldername: string;
	files: string[];
}

interface IParseDataFormat {
	subfolder_id: number;
	subfoldername: string;
	original_path: string;
	files: string[];
}

interface IFileName {
	file: string;
	subfoldername: string;
	original_path: string;
	subfolder_id: number;
}

interface IScannedData {
	scanned_data: string;
	scanned_path: string;
}

interface ILoadNTP {
	is_approved: boolean;
	ntp: string;
	foldername: string;
	file: string;
}

interface IFilterNTP {
	status: string;
	sort: string;
	search: string;
}

interface IOriginalFileList {
	file_id: number;
	file: string;
	ntp: string;
	foldername: string;
}
