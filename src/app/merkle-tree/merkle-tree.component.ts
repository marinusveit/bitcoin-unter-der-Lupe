import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merkle-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merkle-tree.component.html',
  styleUrls: ['./merkle-tree.component.scss']
})
export class MerkleTreeComponent implements OnInit {
  dataBlocks: string[] = ['Tx A', 'Tx B', 'Tx C', 'Tx C'];
  tree: { hash: string, label: string }[][] = [];
  math = Math;
  constructor() { }

  ngOnInit() {
    this.buildMerkleTree(this.dataBlocks);
  }

  hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  buildMerkleTree(dataBlocks: string[]) {
    let currentLevel = dataBlocks.map(data => ({ hash: this.hash(data), label: `Hash(${data})` }));
    this.tree.push(currentLevel);

    while (currentLevel.length > 1) {
      const nextLevel: { hash: string, label: string }[] = [];

      for (let i = 0; i < currentLevel.length; i += 2) {
        if (i + 1 < currentLevel.length) {
          const combinedData = currentLevel[i].hash + currentLevel[i + 1].hash;
          nextLevel.push({
            hash: this.hash(combinedData),
            label: `Hash(${currentLevel[i].label} + ${currentLevel[i + 1].label})`
          });
        } else {
          const combinedData = currentLevel[i].hash + currentLevel[i].hash;
          nextLevel.push({
            hash: this.hash(combinedData),
            label: `Hash(${currentLevel[i].label} + ${currentLevel[i].label})`
          });
        }
      }

      this.tree.push(nextLevel);
      currentLevel = nextLevel;
    }
  }
}
