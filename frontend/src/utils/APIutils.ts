const apiUtils = {
	checkStatus(response: any) {
		if (response.ok) {
			return response;
		} else {
			console.log(
				`checkStatus() - None 200 response ${JSON.stringify(response)}`
			);
			return response.text().then((text: any | undefined) => {
				throw new Error(text);
			});
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
