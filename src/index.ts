import { Blockchain } from "./model/Blockchain"
import { Block } from "./model/Block"
import { Transaction } from "./model/Transaction"

let blockchain = new Blockchain()
blockchain.addBlock(new Block(new Date(), { amount: 4}))
blockchain.addBlock(new Block(new Date(), { amount: 10}))

// console.log(blockchain.isChainVadid())


blockchain.createTransaction(new Transaction("addr1", "addr2", 100))
blockchain.createTransaction(new Transaction("addr2", "addr1", 25))
blockchain.createTransaction(new Transaction("addr3", "addr1", 25))

console.log(JSON.stringify(blockchain))
blockchain.minePendingTransaction("addr1")
blockchain.minePendingTransaction("addr1")

console.log(blockchain.getBalanceOfAddress("addr1"))
