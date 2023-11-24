import { SubFolder } from "../components/SubFolder";
import { apiUtils } from "../utils/APIutils";

function convertToSubFolderModels(data: any[]): SubFolder[] {
	let subFolders: SubFolder[] = data.map(convertToSubFolderModel);
	return subFolders;
}

function convertToSubFolderModel(item: any): SubFolder {
	return new SubFolder(item);
}

const subFolderAPI = {
	get() {
		return fetch("/subfolder")
			.then(apiUtils.delay(600))
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToSubFolderModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error retrieving the subFolders. Please try again."
				);
			});
	},
	getByMonthYearPeriod(monthYearPeriod: String) {
		return fetch(`/subfolder/date?monthYearPeriod=${monthYearPeriod}`)
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToSubFolderModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error retrieving the subFolders. Please try again."
				);
			});
	},

	post(subFolder: SubFolder) {
		return fetch("/subfolder", {
			method: "POST",
			body: JSON.stringify(subFolder),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the subFolder. Please try again."
				);
			});
	},

	patch(subFolder: SubFolder) {
		return fetch(`/subfolder/${subFolder.id}`, {
			method: "PATCH",
			body: JSON.stringify(subFolder),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToSubFolderModel)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the subFolder. Please try again."
				);
			});
	},

	delete(subFolder: SubFolder) {
		return fetch(`/subfolder/${subFolder.id}`, {
			method: "DELETE",
		})
			.then(apiUtils.checkStatus)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error deleting the subFolder. Please try again."
				);
			});
	},
};

export { subFolderAPI };
