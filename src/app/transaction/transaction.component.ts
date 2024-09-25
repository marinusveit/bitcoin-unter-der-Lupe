import { Component, ChangeDetectorRef } from '@angular/core';
import { exampleTransactions, txToDisplay } from '../../assets/data/transactions';
import { TransactionTemplateComponent } from '../transaction-template/transaction-template.component';
import { CommonModule } from '@angular/common';
import { Transaction } from '../data_types/transaction';
import { HIGHLIGHT_OPTIONS, Highlight, HighlightAuto } from 'ngx-highlightjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TransactionTemplateComponent, Highlight, HighlightAuto],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  providers: [DataService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: {
          json: () => import('highlight.js/lib/languages/json')
        }
      }
    }
  ]
})
export class TransactionComponent {
  txToDisplay = txToDisplay
  transactions: Transaction[] = exampleTransactions
  merkleRoot: string = ''

  constructor(private cdr: ChangeDetectorRef) { }

  // JSON string for displaying raw transaction in JSON format
  transactionJson = JSON.stringify(this.txToDisplay, null, 2)

  updateTx(transactions: Transaction[]) {
    this.transactions = transactions
    // Manuell die Change Detection auslösen
    this.cdr.detectChanges();
  }

  updateMerkleRoot(merkleRoot: string) {
    this.merkleRoot = merkleRoot
    // Manuell die Change Detection auslösen, ansonsten bekommt man NG0100 ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }

}
