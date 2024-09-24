import { Component, ChangeDetectorRef } from '@angular/core';
import { exampleTransactions } from '../../assets/data/transactions';
import { TransactionTemplateComponent } from '../transaction-template/transaction-template.component';
import { CommonModule } from '@angular/common';
import { Transaction } from '../data_types/transaction';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TransactionTemplateComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  transactions: Transaction[] = exampleTransactions
  merkleRoot: string = ''

  constructor(private cdr: ChangeDetectorRef){

  }

  updateTx(transactions: Transaction[]){
    this.transactions = transactions
    // Manuell die Change Detection auslösen
    this.cdr.detectChanges();
  }

  updateMerkleRoot(merkleRoot: string){
    this.merkleRoot = merkleRoot
    // Manuell die Change Detection auslösen, ansonsten bekommt man NG0100 ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }

}
