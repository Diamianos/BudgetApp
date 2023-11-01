const apiUtils = {
	checkStatus(response: any) {
		if (response.ok) {
			return response;
		} else {
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
