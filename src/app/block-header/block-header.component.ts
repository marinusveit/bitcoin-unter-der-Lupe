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

// TODO: schwierigkeit noh einmal überprüfen, darf nicht zu schwierig sein, außerdem bin ich mir nicht sicher, ob die umrechnung auch wirklich stimmt. kurz ein paar werte mit https://learnmeabitcoin.com/technical/block/bits/ geprüft, sieht ganz gut aus
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
  nBitsWarning: string = '';
  maxDifficulty: number = 1.1042793496663079e+71

  constructor() {
    this.updateTarget();
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.SHA256(crypto.SHA256(this.blockVersion + this.previousBlockHash + this.merkleRootHash + this.timestamp + this.nBits + this.nonce)).toString();
  }

  updateHash() {
    this.hash = this.calculateHash();
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

  // calculateTarget(nBits: number): string {
  //   const exponent = nBits >> 24;
  //   const mantissa = nBits & 0xFFFFFF;
  //   let target = mantissa * Math.pow(2, 8 * (exponent - 3));
  //   return target.toString(16).padStart(64, '0');
  // }

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
