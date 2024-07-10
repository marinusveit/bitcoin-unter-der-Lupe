import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-block-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './block-header.component.html',
  styleUrls: ['./block-header.component.scss']
})
export class BlockHeaderComponent {
  blockVersion: number = 1;
  previousBlockHash: string = '';
  merkleRootHash: string = '';
  timestamp: number = Math.floor(Date.now() / 1000);
  nonce: number = 0;
  nBits: number = 0x1effffff;
  hash: string = '';
  target: string = '';
  showAdvancedInfo: boolean = false;

  constructor() {
    this.updateTarget();
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.SHA256(this.blockVersion + this.previousBlockHash + this.merkleRootHash + this.timestamp + this.nBits + this.nonce).toString();
  }

  updateHash() {
    this.hash = this.calculateHash();
  }

  updateTarget() {
    this.target = this.calculateTarget(this.nBits);
    this.updateHash();
  }

  calculateTarget(nBits: number): string {
    const exponent = nBits >> 24;
    const mantissa = nBits & 0xFFFFFF;
    let target = mantissa * Math.pow(2, 8 * (exponent - 3));
    return target.toString(16).padStart(64, '0');
  }

  isHashValid(): boolean {
    return this.hash < this.target;
  }

  mine() {
    this.nonce = 0;
    this.hash = this.calculateHash();

    while (!this.isHashValid()) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  toggleAdvancedInfo() {
    this.showAdvancedInfo = !this.showAdvancedInfo;
  }

}
