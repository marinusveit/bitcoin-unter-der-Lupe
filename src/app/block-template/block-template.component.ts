import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as crypto from 'crypto-js';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from '../transaction/transaction.component';  // Stelle sicher, dass du ein Transaction Model hast
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-block-template',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionComponent],
  templateUrl: './block-template.component.html',
  styleUrl: './block-template.component.scss'
})
export class BlockTemplateComponent {
  @Input() previousBlockHash: string = '';
  @Input() nBits: number = 0x1effffff;
  @Input() transactions: TransactionComponent[] = [];
  @Output() hashChange = new EventEmitter<string>();

// TODO: MerkleRootHash aus transactions berechnen
  hash: string = '';
  nonce: number = 0;
  merkleRootHash: string = '';
  nBitsWarning: string = '';
  showAdvancedInfo: boolean = false;
  showTransactions: boolean = false;
  target: string = '';
  maxDifficulty: number = 1.1042793496663079e+71


  constructor() {
    this.updateTarget();
    this.hash = this.calculateHash();
  }


  ngOnChanges() {
    this.updateHash();
    this.updateTarget();
  }

  toggleAdvancedInfo() {
    this.showAdvancedInfo = !this.showAdvancedInfo;
  }

  toggleTransactions() {
    this.showTransactions = !this.showTransactions;
  }

  updateHash() {
    this.hash = this.calculateHash();
    this.hashChange.emit(this.hash);
  }

  isHashValid(): boolean {
    return this.hash < this.target;
  }

  updateTarget() {
    if (this.nBits < 0x1e00ffff) {
      this.nBitsWarning = 'Die Schwierigkeit darf nicht kleiner als 0x1e00ffff sein.';
      this.nBits = 0x1e00ffff;
    } else {
      this.nBitsWarning = '';
    }
    this.target = this.calculateTarget(this.nBits);
    this.updateHash();
  }

  calculateTarget(nBits: number): string {
    const exponent = nBits >> 24;
    const mantissa = nBits & 0xFFFFFF;
    let target = mantissa * Math.pow(2, 8 * (exponent - 3));
    let targetWithLeadingZeros = target.toString(16).padStart(64, '0')
    if (target < this.maxDifficulty){
      this.nBitsWarning = `Der Target Value (=${ targetWithLeadingZeros }) ist zu klein, wählen Sie bitte einen anderen Bits Wert, sodass das Mining nicht zu lange dauert`;
      return this.maxDifficulty.toString(16).padStart(64, '0');
    }
    return targetWithLeadingZeros
  }

  calculateHash(): string {
    return crypto.SHA256(crypto.SHA256(this.previousBlockHash + this.merkleRootHash + this.nBits + this.nonce)).toString();
  }

  mine() {
    this.nonce = 0;
    this.hash = this.calculateHash();

    while (!this.isHashValid()) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    // Emit Event, wenn der Block gemined wurde
    this.hashChange.emit(this.hash);
  }


}