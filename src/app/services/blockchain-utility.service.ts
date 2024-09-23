import { Injectable } from '@angular/core';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class BlockchainUtilityService {


  // Funktion zur Berechnung eines SHA-256-Hashes für einen String
  calculateHash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Berechnet die Merkle-Root für eine Liste von Transaktionen
  calculateMerkleRoot(transactions: string[]): string {
    // Schritt 1: Erstelle eine Liste von Hashes basierend auf den Transaktions-IDs
    let hashes = transactions.map(tx => this.calculateHash(tx));

    // Schritt 2: Solange mehr als ein Hash übrig ist, paare und hashe die Hashes
    while (hashes.length > 1) {
      // Falls ungerade Anzahl von Hashes, den letzten Hash duplizieren
      if (hashes.length % 2 !== 0) {
        hashes.push(hashes[hashes.length - 1]);
      }

      const newHashes = [];
      // Schritt 3: Paarweise Hashes kombinieren
      for (let i = 0; i < hashes.length; i += 2) {
        const combined = hashes[i] + hashes[i + 1]; // Verbinde zwei Hashes zu einem String
        newHashes.push(this.calculateHash(combined)); // Hash des kombinierten Strings berechnen
      }
      // Ersetze die ursprüngliche Hashliste durch die neu berechnete Ebene
      hashes = newHashes;
    }

    // Schritt 4: Der übriggebliebene Hash ist die Merkle-Root
    return hashes[0]; // Dies ist der finale Root-Hash des Merkle-Baums
  }
}
