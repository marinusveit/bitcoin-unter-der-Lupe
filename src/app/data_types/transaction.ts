export interface Transaction {
    txId: string;
    inputs: TxInput[];
    outputs: TxOutput[];
}

export interface TxInput {
    previousTxHash: string;
    index: number;
    scriptSig: string;

}

export interface TxOutput {
    value: number;
    scriptPubKey: string;
}