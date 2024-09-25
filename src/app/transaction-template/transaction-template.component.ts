import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as crypto from 'crypto-js';
import { FormsModule } from '@angular/forms';
import { Transaction, TxInput, TxOutput } from '../data_types/transaction';
import { MerkleTree } from 'merkletreejs'
import { Buffer } from 'buffer'; // wird benötigt, da ansonsten option isBitcoinTree fehler wirft
(window as any).Buffer = Buffer;
import * as bitcoin from 'bitcoinjs-lib';

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

  @Output() merkleRootChange = new EventEmitter<string>()
  merkleRoot: string = ''
  // Map zur Verwaltung der aktuellen Ansicht (Hex oder ASM) pro Input
  isAsmView: { [key: string]: boolean } = {};


  hexToAsm(hex: string): string {
    const buffer = Buffer.from(hex, 'hex');
    var asm_array = bitcoin.script.toASM(buffer).split(' ');
    var asm = ''
    for (let slice of asm_array){
      console.log(asm)
      console.log(slice)
      if(!slice.startsWith('OP_')){
        asm = asm.concat(`<i class="bi bi-key-fill" title="Public Key Hash"> ${slice}</i><br>`)
      }
      else{
        asm = asm.concat(slice).concat('<br>')
      }
    }
    return asm
  }

  hexToAsmScriptSig(hex: string): string {
    const buffer = Buffer.from(hex, 'hex');

    // Teilen des Buffers für die Signatur und den öffentlichen Schlüssel
    const sigLength = buffer[0]; // Erster Byte für die Signaturlänge
    const pubKeyLength = buffer[sigLength + 1]; // Letzter Byte für die Länge des public keys

    const signature = buffer.slice(1, sigLength + 1).toString('hex');
    const publicKey = buffer.slice(sigLength + 2).toString('hex'); // 2 Bytes für die Längen

    return `OP_PUSHBYTES_${sigLength}<br><i class="bi bi-vector-pen" title="Signatur"> ${signature}</i><br>OP_PUSHBYTES_${pubKeyLength}<br><i class="bi bi-key-fill" title="Public Key"> ${publicKey}</i>`;
  }

  ngAfterContentInit() {
    this.updateMerkleRoot();  // Initiale Berechnung der Merkle Root
    this.initializeAsmView(); // Initialisiere ASM-Ansichten
  }

  // Initialisiere die ASM-Ansichten für alle Inputs und Outputs
  initializeAsmView() {
    for (const tx of this.transactions) {
      for (const input of tx.inputs) {
        // Standardmäßig Hex-Ansicht für ScriptSig
        this.isAsmView[input.previousTxHash] = false;
      }
      for (const output of tx.outputs) {
        // Standardmäßig Hex-Ansicht für ScriptPubKey
        this.isAsmView[output.scriptPubKey] = false;
      }
    }
  }

  // Setzt die Ansicht auf ASM oder Hex
  setScriptSigView(input: TxInput, isAsm: boolean) {
    this.isAsmView[input.previousTxHash] = isAsm;
  }

  // Setzt die Ansicht auf ASM oder Hex für ScriptPubKey
  setScriptPubKeyView(output: TxOutput, isAsm: boolean) {
    this.isAsmView[output.scriptPubKey] = isAsm;
  }

  // Methode zur Berechnung der Merkle Root
  updateMerkleRoot() {
    // Extrahiere alle txIds als Blätter für den Merkle-Baum
    const leaves = this.transactions.map(tx => crypto.SHA256(tx.txId))
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
        tx.txId = crypto.SHA256(inputsString + outputsString).toString(crypto.enc.Hex);
        this.updateMerkleRoot();  // Initiale Berechnung der Merkle Root
        this.txChange.emit(this.transactions)  // Emitiere die neue Transaktions-ID
        this.merkleRootChange.emit(this.merkleRoot)
      }
    }
  }

}
