import { Component, Input } from '@angular/core';
import { exampleTransactions } from '../../assets/data/transactions';
import { TransactionTemplateComponent } from '../transaction-template/transaction-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TransactionTemplateComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  transactions = exampleTransactions;

}
