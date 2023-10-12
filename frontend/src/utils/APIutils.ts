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

const apiUtils = {
	checkStatus(response: any) {
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
	},
	parseJSON(response: Response) {
		return response.json();
	},
	delay(ms: number) {
		return function (x: any): Promise<any> {
			return new Promise((resolve) => setTimeout(() => resolve(x), ms));
		};
	},
};

export { apiUtils };
