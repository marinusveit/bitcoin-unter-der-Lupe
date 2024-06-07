import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hash-function',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hash-function.component.html',
  styleUrl: './hash-function.component.scss'
})
export class HashFunctionComponent {
  hash: string[] = [];
  hashHex: string = '';
  previousHash: string[] = [];

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.hashHex = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    const newHash = this.hexToBinary(this.hashHex).split('');
    // Update previous hash before setting the new hash
    this.previousHash = this.hash;
    this.hash = newHash;
  }

  hexToBinary(hex: string): string {
    return hex.split('').map((char) => {
      const bin = parseInt(char, 16).toString(2);
      return bin.padStart(4, '0'); // Jede hexadezimale Ziffer wird in 4-Bit-Binärzahl umgewandelt
    }).join('');
  }
}