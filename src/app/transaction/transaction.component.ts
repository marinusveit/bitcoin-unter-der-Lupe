import { Component, Input } from '@angular/core';
import { exampleTransactions } from '../../assets/data/transactions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  @Input() txId: string = '';
  @Input() inputs: any[] = [];
  @Input() outputs: any[] = [];

  transactions = exampleTransactions;
}
