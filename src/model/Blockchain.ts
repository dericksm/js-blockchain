import { Block } from "./Block"
import { Transaction } from './Transaction';

export class Blockchain {

    public chain: Block[] = [this.createGenesisBlock()]
    public difficulty: number = 2
    public minningReward: number = 100
    public pendingTransactions: Transaction[] = []

    contructor() {
    }
    createGenesisBlock() {
        return new Block(new Date(), "The Times Chancellor on Brink of Second Bailout", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransaction(minningAddress: string) {
        const rewardTX = new Transaction(null, minningAddress, this.minningReward)
        this.pendingTransactions.push(rewardTX)

        let block = new Block(new Date(), this.pendingTransactions, this.getLatestBlock().hash)
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        
        this.pendingTransactions = []
    }

    addTransaction(transaction: Transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction doesn't has any addresses")
        }

        if (!transaction.isValid) {
            throw new Error("Cannot add a invalid transaction to the chain")
        }
        
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address: String) {
        let balance = 0
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount
                }
                if (transaction.toAddress === address) {
                    balance += transaction.amount
                }

            }
        }
        return balance
    }

    isChainVadid() {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index]
            const previousBlock = this.chain[index - 1]

            if (!currentBlock.hasValidTransactions()) {
                return false
            }

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }

        }

        return true
    }
}

