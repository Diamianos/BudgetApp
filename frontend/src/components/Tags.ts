export class Tags {
	bill: number = 0;
	takeOut: number = 0;
	leave: number = 0;
	transfer: number = 0;

	constructor(initializer?: any) {
		if (!initializer) return;
		if (initializer.BILL) this.bill = Number(initializer.BILL);
		if (initializer.TAKE_OUT) this.takeOut = Number(initializer.TAKE_OUT);
		if (initializer.LEAVE) this.leave = Number(initializer.LEAVE);
		if (initializer.TRANSFER) this.transfer = Number(initializer.TRANSFER);
	}
}
