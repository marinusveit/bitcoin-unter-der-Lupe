import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockTemplateComponent } from '../block-template/block-template.component';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-block-chain',
  standalone: true,
  imports: [CommonModule, BlockTemplateComponent],
  templateUrl: './block-chain.component.html',
  styleUrl: './block-chain.component.scss'
})
export class BlockChainComponent {
  blocks: { previousBlockHash: string, nBits: number, transactions: any[], mined: boolean, hash: string, nonce: number }[] = [];

  constructor() {
    // Initialer Block ohne vorherigen Hash (Genesis Block)
    this.blocks.push({
      previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
      nBits: 0x1effffff,
      transactions: [],
      mined: false,
      hash: '',
      nonce: 0
    });
  }

  // Methode, um einen neuen Block hinzuzufügen
  addBlock(previousBlockHash: string) {
    this.blocks.push({
      previousBlockHash: previousBlockHash,
      nBits: 0x1effffff,
      transactions: [],
      mined: false,
      hash: '',
      nonce: 0
    });
  }

  // onBlockMined(index: number, hash: string) {
  //   this.blocks[index].hash = hash;
  //   this.blocks[index].mined = true;

  //   // Rekursive Aktualisierung der nachfolgenden Blöcke
  //   this.updateFollowingBlocks(index);
  // }

  onHashChange(index: number, hash: string) {
    this.blocks[index].hash = hash;
    if(this.blocks[index].hash < "0000ffffff000000000000000000000000000000000000000000000000000000") { // todo: über service mit hilfsfunktionen -> clculate target
      this.blocks[index].mined = true;
    }
    this.updateFollowingBlocks(index);
  }

  // Rekursive Methode, um die nachfolgenden Blöcke zu aktualisieren
  updateFollowingBlocks(index: number) {
    if (index + 1 < this.blocks.length) {
      const nextBlock = this.blocks[index + 1];
      nextBlock.previousBlockHash = this.blocks[index].hash;
      nextBlock.mined = false; // Der Block muss neu gemined werden, da sich sein prevHash geändert hat
      this.onHashChange(index + 1, this.calculateHash(nextBlock.previousBlockHash, nextBlock.nBits, nextBlock.transactions, nextBlock.nonce));
    }
  }

  // Eine einfache Methode zur Berechnung des Hashes eines Blocks
  calculateHash(previousBlockHash: string, nBits: number, transactions: any[], nonce: number): string {
    return crypto.SHA256(crypto.SHA256(previousBlockHash + transactions + nBits + nonce)).toString();

  }
}
