import { Expense } from "../pages/subFolders/Expense";
import { apiUtils } from "../utils/APIutils";

function convertToExpenseModel(item: any): Expense {
	return new Expense(item);
}

const expenseAPI = {
	post(subFolderId: number | undefined, expense: Expense) {
		return fetch(`/expense/${subFolderId}`, {
			method: "POST",
			body: JSON.stringify(expense),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToExpenseModel)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(
					"There was an error adding the expense. Please try again."
				);
			});
	},
};

export { expenseAPI };
