import { Transaction } from "./transaction";

export interface Block {
    previousBlockHash: string,
    blockVersion: number,
    timestamp: number,
    nBits: number,
    nonce: number
    hash: string,
    merkleRootHash: number,
    transactions: Transaction[],
}
