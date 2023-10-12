import { Expense } from "../pages/subFolders/Expense";
import { apiUtils } from "../utils/APIutils";

const expenseAPI = {
	post(expense: Expense) {
		return fetch("/expense", {
			method: "POST",
			body: JSON.stringify(expense),
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
};

export { expenseAPI };
