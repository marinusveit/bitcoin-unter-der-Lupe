import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var bootstrap: any; // Deklaration für Bootstrap

@Component({
  selector: 'app-hash-function',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './hash-function.component.html',
  styleUrl: './hash-function.component.scss'
})
export class HashFunctionComponent {

  constructor() { }

  // vars for avalanche effect
  hash: string[] = [];
  hashHex: string = '';
  previousHash: string[] = [];
  // vars for preimage resistance
  inputText: string = '';
  hashBinary: string[] = [];
  targetHashBinary: string = '1011010000000101011011011111011001101001000111111000110111000111001011100101011000110000001011011101101011010011010001011101011001011111111010101101001111101010110110010010100110010110000010011010100000100110111000100011010001001110101101100011101010100100';
  // vars for 2nd preimage resistance
  leftInputText: string = 'Urbild x1';
  rightInputText = '';
  leftHashBinary = this.calculateHash(this.leftInputText).join('');
  rightHashBinary: string[] = [];
  // vars for Collision resistance
  collisionResistanceX1: string = 'x1'
  collisionResistanceX2: string = 'x2'
  leftCollisionResistanceHash: string[] = this.calculateHash(this.collisionResistanceX1);
  rightCollisionResistanceHash: string[] = this.calculateHash(this.collisionResistanceX2);



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

  ngOnInit(): void {
    // JavaScript für Bootstrap Collapse
    var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
    var collapseList = collapseElementList.map(function (collapseEl: any) {
      return new bootstrap.Collapse(collapseEl);
    });
  }

    // Function to calculate SHA-256 hash and compare with target hash
    calculateHash(urbild: string): string[] {
      const hashHex = CryptoJS.SHA256(urbild).toString(CryptoJS.enc.Hex);
      return this.hexToBinary(hashHex).split(''); // Konvertiere die binäre Zeichenfolge in ein Array von Zeichen
    }


}