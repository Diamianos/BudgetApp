import { SubFolder } from "../pages/subFolders/SubFolder";

function translateStatusToErrorMessage(status: number) {
	switch (status) {
		case 401:
			return "Please login again.";
		case 403:
			return "You do not have permission to view the folder(s).";
		default:
			return "There was an error retrieving the folder(s). Please try again.";
	}
}

function checkStatus(response: any) {
	if (response.ok) {
		return response;
	} else {
		const httpErrorInfo = {
			status: response.status,
			statusText: response.statusText,
			url: response.url,
		};
		console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

		let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
		throw new Error(errorMessage);
	}
}

function parseJSON(response: Response) {
	return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
	return function (x: any): Promise<any> {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}

function convertToProjectModels(data: any[]): SubFolder[] {
	let subFolders: SubFolder[] = data.map(convertToFolderModel);
	return subFolders;
}

function convertToFolderModel(item: any): SubFolder {
	return new SubFolder(item);
}

const subFolderAPI = {
	get() {
		return fetch("/subfolder")
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then(convertToProjectModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error retrieving the subFolder. Please try again."
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
			.then(checkStatus)
			.then(parseJSON)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the subFolder. Please try again."
				);
			});
	},

	put(subFolder: SubFolder) {
		return fetch(`/subfolder/${subFolder.id}`, {
			method: "PUT",
			body: JSON.stringify(subFolder),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(checkStatus)
			.then(parseJSON)
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
			.then(checkStatus)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error deleting the subFolder. Please try again."
				);
			});
	},
};

export { subFolderAPI };
