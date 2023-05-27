export class SubFolder{
    id: number | undefined;
    created_at: Date = new Date();
    updated_at: Date = new Date();
    name: string = '';
    amount: number = 0;
    balance: number = 0;
    month_period: string = '';

    constructor(initializer?: any){
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.created_at) this.created_at = initializer.created_at;
        if (initializer.updated_at) this.updated_at = initializer.updated_at;
        if (initializer.name) this.name = initializer.name;
        if (initializer.amount) this.amount = initializer.amount;
        if (initializer.balance) this.balance = initializer.balance;
        if (initializer.month_period) this.month_period = initializer.month_period;
    }

}