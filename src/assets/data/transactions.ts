import { Transaction } from "../../app/data_types/transaction";

export const exampleTransactions: Transaction[] = [
    {
      txId: 0x883c83a2520ec0bd5aa4f949b019002126b8c75b92b59f4a2f8e8f23de79c55d,
      inputs: [
        {
          previousTxHash: 0x3f5b5615d6f565d282c8ba3e49b6f1557c1c41b1a2f1f5c5c85c2e2f5f3b5478,
          index: 0,
          scriptSig: '304402201e7a26052da1...'
        }
      ],
      outputs: [
        {
          value: 5000000000,
          scriptPubKey: '76a9144621dedd30688...'
        },
        {
          value: 2000000000,
          scriptPubKey: '76a914e0a3982f1923e...'
        }
      ]
    },
    {
      txId: 0xd5013df911908ed131290de51bb9bcab45f3487d1b0a73fa3f95699e39ea2302,
      inputs: [
        {
          previousTxHash: 0x0000000000000000000000000000000000000000000000000000000000000000,
          index: 1,
          scriptSig: '304402207a26052da1...'
        }
      ],
      outputs: [
        {
          value: 3000000000,
          scriptPubKey: '76a9148b3dedd30688...'
        }
      ]
    }
  ];

export const exapleCoinbase: Transaction = {
    txId: 0x00,
    inputs: [
      {
        previousTxHash: 0x4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b,
        index: 0,
        scriptSig: '04ffff001d01044554...'
      }
    ],
    outputs: [
      {
        value: 5000000000,
        scriptPubKey: '4104678afdb0fe55482...'
      }
    ]
  }