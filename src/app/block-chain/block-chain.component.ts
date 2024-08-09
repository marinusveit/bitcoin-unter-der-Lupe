import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockTemplateComponent } from '../block-template/block-template.component';

@Component({
  selector: 'app-block-chain',
  standalone: true,
  imports: [CommonModule, BlockTemplateComponent],
  templateUrl: './block-chain.component.html',
  styleUrl: './block-chain.component.scss'
})
export class BlockChainComponent {
  blocks: { previousBlockHash: string, nBits: number, transactions: any[], mined: boolean, hash: string }[] = [];

  constructor() {
    // Initialer Block ohne vorherigen Hash (Genesis Block)
    this.blocks.push({
      previousBlockHash: '',
      nBits: 0x1effffff,
      transactions: [],
      mined: false,
      hash: ''
    });
  }

  // Methode, um einen neuen Block hinzuzufügen
  addBlock(previousBlockHash: string) {
    this.blocks.push({
      previousBlockHash: previousBlockHash,
      nBits: 0x1effffff,
      transactions: [],
      mined: false,
      hash: ''
    });
  }

  onBlockMined(index: number, hash: string) {
    this.blocks[index].hash = hash
    this.blocks[index].mined = true;
  }

}
