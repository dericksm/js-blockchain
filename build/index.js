"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blockchain_1 = require("./model/Blockchain");
var Block_1 = require("./model/Block");
var Transaction_1 = require("./model/Transaction");
var blockchain = new Blockchain_1.Blockchain();
blockchain.addBlock(new Block_1.Block(new Date(), { amount: 4 }));
blockchain.addBlock(new Block_1.Block(new Date(), { amount: 10 }));
// console.log(blockchain.isChainVadid())
blockchain.createTransaction(new Transaction_1.Transaction("addr1", "addr2", 100));
blockchain.createTransaction(new Transaction_1.Transaction("addr2", "addr1", 25));
blockchain.createTransaction(new Transaction_1.Transaction("addr3", "addr1", 25));
console.log(JSON.stringify(blockchain));
blockchain.minePendingTransaction("addr1");
blockchain.minePendingTransaction("addr1");
console.log(blockchain.getBalanceOfAddress("addr1"));
