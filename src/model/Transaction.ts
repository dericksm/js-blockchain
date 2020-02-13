
const SHA256 = require('crypto-js/sha256')
const Elliptic = require("../../node_modules/elliptic").ec
const ec = new Elliptic('secp256k1')

export class Transaction {
    public fromAddress: string
    public toAddress: string
    public amount: number
    public signature: string = ''


    constructor(fromAddress: any, toAddress: string, amount: number) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }

    calculateTransactionHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
    }

    signTransaction(signingKey: any){
        if(signingKey.getPublic("hex") !== this.fromAddress){
            throw new Error("You cannot sign transactions for other wallets")
        }

        const hashTX = this.calculateTransactionHash()
        const sig = signingKey.sign(hashTX, 'base64')
        this.signature = sig.toDER("hex")
    }

    isValid(){
        if(this.fromAddress === null) return true

        if(!this.signature || this.signature.length == 0){
            throw new Error("No signature in this transaction") 
        }

        const pubKey = ec.keyFromPublic(this.fromAddress, "hex")
        return pubKey.verify(this.calculateTransactionHash(), this.signature)
    }

   

}