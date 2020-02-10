export class Transaction {
    public fromAddress: String
    public toAddress: String
    public amount: number


    constructor(fromAddress: any, toAddress: String, amount: number) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount

    }

}