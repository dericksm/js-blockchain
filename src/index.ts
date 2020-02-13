import { Blockchain } from "./model/Blockchain"
import { Block } from "./model/Block"
import { Transaction } from './model/Transaction';
const Elliptic = require("../node_modules/elliptic").ec
const ec = new Elliptic('secp256k1')


const myKey = ec.keyFromPrivate('3566b8e4398c3490c1436b15ea58700f5f5378f997ce7033c5e7df3f36314d6b')
const myWalletAddress = myKey.getPublic("hex")

let blockchain = new Blockchain()

const tx1 = new Transaction(myWalletAddress, "pubkey", 10)
tx1.signTransaction(myKey)
blockchain.addTransaction(tx1)

blockchain.minePendingTransaction(myWalletAddress)
console.log(blockchain.getBalanceOfAddress(myWalletAddress))
