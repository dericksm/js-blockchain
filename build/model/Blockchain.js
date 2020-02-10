"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Block_1 = require("./Block");
var Transaction_1 = require("./Transaction");
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.minningReward = 100;
        this.pendingTransactions = [];
    }
    Blockchain.prototype.contructor = function () {
    };
    Blockchain.prototype.createGenesisBlock = function () {
        return new Block_1.Block(new Date(), "The Times Chancellor on Brink of Second Bailout", "0");
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.addBlock = function (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    };
    Blockchain.prototype.minePendingTransaction = function (minningAddress) {
        var block = new Block_1.Block(new Date(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.pendingTransactions = [
            new Transaction_1.Transaction(null, minningAddress, this.minningReward)
        ];
    };
    Blockchain.prototype.createTransaction = function (transaction) {
        this.pendingTransactions.push(transaction);
    };
    Blockchain.prototype.getBalanceOfAddress = function (address) {
        var balance = 0;
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var transaction = _c[_b];
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }
                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }
        return balance;
    };
    Blockchain.prototype.isChainVadid = function () {
        for (var index = 1; index < this.chain.length; index++) {
            var currentBlock = this.chain[index];
            var previousBlock = this.chain[index - 1];
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
