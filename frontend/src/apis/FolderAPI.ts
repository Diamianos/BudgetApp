import { Folder } from "../components/Folder";
import { apiUtils } from "../utils/APIutils";

function convertToProjectModels(data: any[]): Folder[] {
	let folders: Folder[] = data.map(convertToFolderModel);
	return folders;
}

function convertToFolderModel(item: any): Folder {
	return new Folder(item);
}

const folderAPI = {
	get() {
		return fetch("/folder")
			.then(apiUtils.delay(600))
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToProjectModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error retrieving the folders. Please try again."
				);
			});
	},

	getByMonthYearPeriod(monthYearPeriod: String | undefined) {
		return fetch(`/folder/date?monthYearPeriod=${monthYearPeriod}`)
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToProjectModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error retrieving the folders. Please try again."
				);
			});
	},

	post(folder: Folder) {
		return fetch("/folder", {
			method: "POST",
			body: JSON.stringify(folder),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the folder. Please try again."
				);
			});
	},
	postFolders(folders: Folder[]) {
		return fetch("/folder/folders", {
			method: "POST",
			body: JSON.stringify(folders),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the folder. Please try again."
				);
			});
	},

	put(folder: Folder) {
		return fetch(`/folder/${folder.id}`, {
			method: "PUT",
			body: JSON.stringify(folder),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the folder. Please try again."
				);
			});
	},

	delete(folder: Folder) {
		return fetch(`/folder/${folder.id}`, {
			method: "DELETE",
		})
			.then(apiUtils.checkStatus)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error deleting the folder. Please try again."
				);
			});
	},
};

export { folderAPI };
