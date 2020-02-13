"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHA256 = require('crypto-js/sha256');
var Block = /** @class */ (function () {
    function Block(timestamp, transactions, previousHash) {
        this.transactions = [];
        this.nonce = 0;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    Block.prototype.calculateHash = function () {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    };
    Block.prototype.mineBlock = function (difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    };
    Block.prototype.hasValidTransactions = function () {
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var tx = _a[_i];
            if (tx.isValid()) {
                return false;
            }
        }
        return true;
    };
    return Block;
}());
exports.Block = Block;
