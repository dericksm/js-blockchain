import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public newTx: Transaction
  public walletKey

  constructor(private blockchainService: BlockchainService) {
    this.walletKey = this.blockchainService.walletKeys[0]

   }

  ngOnInit(): void {
    this.newTx = new Transaction()
  }

  createTransaction(){
    this.newTx.fromAddress = this.walletKey.publicKey
    this.newTx.signTransaction(this.walletKey.keyObj)

    this.blockchainService.addTransaction(this.newTx)

    this.newTx = new Transaction()
  }

}
