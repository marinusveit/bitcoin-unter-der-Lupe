import { Component, Input } from '@angular/core';
import { exampleTransactions } from '../../assets/data/transactions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-template.component.html',
  styleUrl: './transaction-template.component.scss'
})
export class TransactionTemplateComponent {
  @Input() txId: string = '';
  @Input() inputs: any[] = [];
  @Input() outputs: any[] = [];

}
