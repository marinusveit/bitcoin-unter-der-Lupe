import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hash-function',
  standalone: true,
  imports: [],
  templateUrl: './hash-function.component.html',
  styleUrl: './hash-function.component.scss'
})
export class HashFunctionComponent {
  hash: string = '';
  hashHex: string = '';

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    // this.hash =  parseInt(CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex), 16).toString(2);
    this.hashHex =  CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    this.hash = this.hexToBinary(this.hashHex)
    console.log(this.hash.length)

  }

  hexToBinary(hex: string): string {
    return hex.split('').map((char) => {
      const bin = parseInt(char, 16).toString(2);
      return bin.padStart(4, '0'); // Jede hexadezimale Ziffer wird in 4-Bit-Binärzahl umgewandelt
    }).join('');
  }
}
