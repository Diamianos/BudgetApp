export class Expense {
	id: number | undefined;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	dateOfTransaction: string = "";
	merchant: string = "";
	amount: number = 0;
	description: string = "";

	constructor(initializer?: any) {
		if (!initializer) return;
		if (initializer.id) this.id = initializer.id;
		if (initializer.created_at) this.createdAt = initializer.created_at;
		if (initializer.updated_at) this.updatedAt = initializer.updated_at;
		if (initializer.dateOfTransaction)
			this.dateOfTransaction = initializer.dateOfTransaction;
		if (initializer.merchant) this.merchant = initializer.merchant;
		if (initializer.amount) this.amount = initializer.amount;
		if (initializer.description) this.description = initializer.description;
	}
}
