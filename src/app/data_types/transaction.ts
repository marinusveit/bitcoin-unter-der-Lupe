export interface Transaction {
    txId: number;
    inputs: TxInput[];
    outputs: TxOutput[];
}

export interface TxInput {
    previousTxHash: number;
    index: number;
    scriptSig: string;

}

export interface TxOutput {
    value: number;
    scriptPubKey: string;
}