import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  blockNumber: number = 1;
  nonce: number = 0;
  leadingZeros: number = 4; // Standardwert für 4 führende Nullen
  nBits: number = 0x1effffff;
  data: string = '';
  hash: string = '';
  target: string = '';
  nBitsHex: string = '';
  requiredZeros: string = '';

  constructor() {
    this.updateNBits();
    this.updateTarget();
    this.hash = this.calculateHash();
    console.log('Erwartet: 1c010000; berechnet: ' + this.leadingZerosToNBits(2).toString(16).padStart(8, '0')); // Erwartet: '1c010000'
    console.log('Erwartet: 1c00ffff; berechnet: ' + this.leadingZerosToNBits(4).toString(16).padStart(8, '0')); // Erwartet: '1c00ffff'
    console.log('Erwartet: 1b0404cb; berechnet: ' + this.leadingZerosToNBits(8).toString(16).padStart(8, '0')); // Erwartet: '1b0404cb'

  }

  calculateHash(): string {
    return crypto.SHA256(this.blockNumber + this.nonce + this.data).toString();
  }

  updateHash() {
    this.hash = this.calculateHash();
  }

  updateNBits() {
    let adjustedLeadingZeros = this.leadingZeros > 8 ? 8 : this.leadingZeros;
    this.nBits = this.leadingZerosToNBits(adjustedLeadingZeros);
    this.nBitsHex = this.nBits.toString(16).padStart(8, '0');
    this.updateTarget();
  }

  leadingZerosToNBits(leadingZeros: number): number {
    const exponent = 3 + Math.floor(leadingZeros / 2);
    const mantissa = Math.pow(2, (8 * (exponent - 3)) - leadingZeros);

    // Berechnung des Mantissenwerts gemäß Bitcoin-Spezifikation
    const mantissaInt = Math.floor(mantissa);
    const nBits = (exponent << 24) | mantissaInt;

    return nBits;
  }

  updateTarget() {
    this.target = this.calculateTarget(this.nBits);
    this.requiredZeros = '0'.repeat(this.leadingZeros > 8 ? 8 : this.leadingZeros);
    this.updateHash();
  }

  calculateTarget(nBits: number): string {
    const exponent = nBits >> 24;
    const mantissa = nBits & 0xFFFFFF;
    let target = mantissa * Math.pow(2, 8 * (exponent - 3));
    return target.toString(16).padStart(64, '0');
  }

  isHashValid(): boolean {
    return this.hash.startsWith(this.requiredZeros);
  }

  mine() {
    this.nonce = 0;
    this.hash = this.calculateHash();

    while (!this.isHashValid()) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}
