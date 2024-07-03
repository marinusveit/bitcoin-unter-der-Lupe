import { Component } from '@angular/core';
import * as crypto from 'crypto-js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {

  blockNumber: number = 1;
  nonce: number = 0;
  data: string = '';
  hash: string = '';

  constructor() {
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.SHA256(this.blockNumber + this.nonce + this.data).toString();
  }

  updateHash() {
    this.hash = this.calculateHash();
  }

  mine() {
    this.nonce = 0;
    this.hash = this.calculateHash();

    while (!this.hash.startsWith('0000')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

}
