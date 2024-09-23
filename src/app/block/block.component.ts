import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { HIGHLIGHT_OPTIONS, Highlight, HighlightAuto } from 'ngx-highlightjs';
// import 'highlight.js/styles/androidstudio.min.css'; // anderes farb scheme für code
import { exampleTransactions } from '../../assets/data/transactions';
import { Transaction } from '../data_types/transaction';
import { BlockTemplateComponent } from '../block-template/block-template.component';
import { Block } from '../data_types/block'

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule, FormsModule, Highlight, HighlightAuto, BlockTemplateComponent],
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
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
export class BlockComponent implements OnInit {
  @Input() transactions: Transaction[] = exampleTransactions;

  block: Block = {
    blockVersion: 1,
    previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
    merkleRootHash: 0x0000000000000000000000000000000000000000000000000000000000000000,
    timestamp: Math.floor(Date.now() / 1000),
    nonce: 0,
    nBits: 0x1effffff,
    hash: '',
    transactions: this.transactions
  }

  bitcoin_block: any; // um block aus json file zu laden

  ngOnInit(): void {
    this.dataService.getBlock().subscribe(data => {
      this.bitcoin_block = data;
    });
  }

  constructor(private dataService: DataService) {}

}
