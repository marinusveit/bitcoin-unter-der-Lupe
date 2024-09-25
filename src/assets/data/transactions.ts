import { Transaction } from "../../app/data_types/transaction";

export const exampleTransactions: Transaction[] = [
    {
      txId: '883c83a2520ec0bd5aa4f949b019002126b8c75b92b59f4a2f8e8f23de79c55d',
      inputs: [
        {
          previousTxHash: '3f5b5615d6f565d282c8ba3e49b6f1557c1c41b1a2f1f5c5c85c2e2f5f3b5478',
          index: 0,
          scriptSig: '483045022100c233c3a8a510e03ad18b0a24694ef00c78101bfd5ac075b8c1037952ce26e91e02205aa5f8f88f29bb4ad5808ebc12abfd26bd791256f367b04c6d955f01f28a7724012103f0609c81a45f8cab67fc2d050c21b1acd3d37c7acfd54041be6601ab4cef4f31'
        }
      ],
      outputs: [
        {
          value: 5000000000,
          scriptPubKey: '76a914b0dcbf97eabf4404e31d952477ce822dadbe7e1088ac'
        },
        {
          value: 2000000000,
          scriptPubKey: '76a9146b1281eec25ab4e1e0793ff4e08ab1abb3409cd988ac'
        }
      ]
    },
    {
      txId: 'd5013df911908ed131290de51bb9bcab45f3487d1b0a73fa3f95699e39ea2302',
      inputs: [
        {
          previousTxHash: '2a5b5615d6f565d282c8ba3e49b6f1557c1c41b1a2f1f5c5c85c2e2f5f3b5478',
          index: 1,
          scriptSig: '47304402206dfb058ecbca366b72f61508c22f65c00c06dd7606ea5b3f38a512c0ef4d8819022055060ebaeb89c34c62e918d9c1e13d2dac577b21dd6abe514309d557e7eab79a014104147c9684f526d6061e5bbf815e49adf1f3ad625a88f8103e9a2b7c49965e2d7ffae8345f424f7fa73ed85203611da2bfdfc3a7203ca8abb2534773fcb2c0454e'
        }
      ],
      outputs: [
        {
          value: 3000000000,
          scriptPubKey: '76a91439aa3d569e06a1d7926dc4be1193c99bf2eb9ee088ac'
        }
      ]
    }
  ];

export const exapleCoinbase: Transaction = {
    txId: '0000000000000000000000000000000000000000000000000000000000000000',
    inputs: [
      {
        previousTxHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
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