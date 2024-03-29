import { Expense } from "./Expense";
import { Tags } from "./Tags";

export class SubFolder {
	id: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
	name: string = "";
	amount: number = 0;
	balance: number = 0;
	description: string = "";
	monthPeriod: string = "";
	tags: Tags = new Tags();
	tagsComplete: boolean = false;
	expenses: Expense[] | undefined;

	constructor(initializer?: any) {
		if (!initializer) return;
		if (initializer.id) this.id = initializer.id;
		if (initializer.created_at) this.created_at = initializer.created_at;
		if (initializer.updated_at) this.updated_at = initializer.updated_at;
		if (initializer.name) this.name = initializer.name;
		if (initializer.amount) this.amount = initializer.amount;
		if (initializer.balance) this.balance = initializer.balance;
		if (initializer.description) this.description = initializer.description;
		if (initializer.monthPeriod) this.monthPeriod = initializer.monthPeriod;
		if (initializer.tags) this.tags = initializer.tags;
		if (initializer.tagsComplete) {
			if (initializer.tagsComplete === null) {
				this.tagsComplete = false;
			}
			this.tagsComplete = initializer.tagsComplete;
		}
		if (initializer.expenses) this.expenses = initializer.expenses;
	}
}
