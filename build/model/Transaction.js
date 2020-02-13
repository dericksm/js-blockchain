"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHA256 = require('crypto-js/sha256');
var Elliptic = require("../../node_modules/elliptic").ec;
var ec = new Elliptic('secp256k1');
var Transaction = /** @class */ (function () {
    function Transaction(fromAddress, toAddress, amount) {
        this.signature = '';
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    Transaction.prototype.calculateTransactionHash = function () {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    };
    Transaction.prototype.signTransaction = function (signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets");
        }
        var hashTX = this.calculateTransactionHash();
        var sig = signingKey.sign(hashTX, 'base64');
        this.signature = sig.toDER("hex");
    };
    Transaction.prototype.isValid = function () {
        if (this.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length == 0) {
            throw new Error("No signature in this transaction");
        }
        var pubKey = ec.keyFromPublic(this.fromAddress, "hex");
        return pubKey.verify(this.calculateTransactionHash(), this.signature);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
