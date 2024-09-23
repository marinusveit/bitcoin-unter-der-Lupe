import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as crypto from 'crypto-js';
import { FormsModule } from '@angular/forms';
import { Transaction, TxInput, TxOutput } from '../data_types/transaction';
import { MerkleTree } from 'merkletreejs'
import { Buffer } from 'buffer'; // wird benötigt, da ansonsten option isBitcoinTree fehler wirft
(window as any).Buffer = Buffer;

@Component({
  selector: 'app-transaction-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-template.component.html',
  styleUrl: './transaction-template.component.scss'
})
export class TransactionTemplateComponent {
  @Input() transactions: Transaction[] = [];
  @Output() txChange = new EventEmitter<Transaction[]>()

  @Output() merkleRootChange = new EventEmitter<string>()  // Speichert die Merkle Root
  merkleRoot: string = ''

  ngOnInit() {
    this.updateMerkleRoot();  // Initiale Berechnung der Merkle Root
  }

  // Methode zur Berechnung der Merkle Root
  updateMerkleRoot() {
    // Extrahiere alle txIds als Blätter für den Merkle-Baum
    const leaves = this.transactions.map(tx => crypto.SHA256(tx.txId.toString(16)))
    console.log(leaves.toString())
    // Erstelle den Merkle-Baum
    const tree = new MerkleTree(leaves, crypto.SHA256, { isBitcoinTree: true })

    // Berechne und speichere die Merkle Root
    this.merkleRoot = tree.getRoot().toString('hex')
    this.merkleRootChange.emit(this.merkleRoot)
  }

  // Methode wird aufgerufen, wenn sich der Wert ändert
  onValueChange(transaction: Transaction) {
    const inputsString = JSON.stringify(transaction.inputs)  // Serialisiere Inputs
    const outputsString = JSON.stringify(transaction.outputs)  // Serialisiere Outputs
    for (let tx of this.transactions) {
      if (tx.txId == transaction.txId) {
        tx = transaction
        tx.txId = Number(crypto.SHA256(inputsString + outputsString).toString(crypto.enc.Hex));
        this.updateMerkleRoot();  // Initiale Berechnung der Merkle Root
        this.txChange.emit(this.transactions)  // Emitiere die neue Transaktions-ID
        this.merkleRootChange.emit(this.merkleRoot)
      }
    }
  }

}
