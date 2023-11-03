import { Expense } from "../components/Expense";
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
			.then(convertToExpenseModel);
	},
	delete(expense: Expense) {
		return fetch(`/expense/${expense.id}`, {
			method: "DELETE",
		}).then(apiUtils.checkStatus);
	},
	patch(
		subFolderId: number | undefined,
		expenseId: number | undefined,
		jsonPatch: string
	) {
		return fetch(`/expense?subFolderId=${subFolderId}&expenseId=${expenseId}`, {
			method: "PATCH",
			body: jsonPatch,
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(apiUtils.checkStatus)
			.then(apiUtils.parseJSON)
			.then(convertToExpenseModel);
	},
};

export { expenseAPI };
