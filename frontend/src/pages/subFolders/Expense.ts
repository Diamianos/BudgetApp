export class Expense {
	id: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
	date_of_transaction: Date | undefined;
	merchant: string = "";
	amount: number = 0;
	description: string = "";

	constructor(initializer?: any) {
		if (!initializer) return;
		if (initializer.id) this.id = initializer.id;
		if (initializer.created_at) this.created_at = initializer.created_at;
		if (initializer.updated_at) this.updated_at = initializer.updated_at;
		if (initializer.date_of_transaction)
			this.date_of_transaction = initializer.date_of_transaction;
		if (initializer.merchant) this.merchant = initializer.merchant;
		if (initializer.amount) this.amount = initializer.amount;
		if (initializer.description) this.description = initializer.description;
	}
}
