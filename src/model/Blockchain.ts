import { Block } from "./Block"
import { Transaction } from './Transaction';
export class Blockchain {

    public chain: Block[] = [this.createGenesisBlock()]
    public difficulty: number = 1
    public minningReward: number = 100
    public pendingTransactions: Transaction[] = []
    contructor() {
    }

    createGenesisBlock(){
        return new Block(new Date(), "The Times Chancellor on Brink of Second Bailout", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock: Block){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    minePendingTransaction(minningAddress: String){
        let block = new Block(new Date(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
         this.pendingTransactions = [
             new Transaction(null, minningAddress, this.minningReward)
         ]
    }

    createTransaction(transaction: Transaction) {
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address: String){
        let balance = 0
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if(transaction.fromAddress === address) {
                    balance -= transaction.amount
                }
                if(transaction.toAddress === address) {
                    balance += transaction.amount
                }
                
            }
        }
        return balance
    }

    isChainVadid(){
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index]
            const previousBlock = this.chain[index -1]

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
            
        }

        return true
    }
}

