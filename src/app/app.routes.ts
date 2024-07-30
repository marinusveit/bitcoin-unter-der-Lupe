import { Routes } from '@angular/router';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { HomeComponent } from './home/home.component';
import { SignatureComponent } from './signature/signature.component';
import { BlockHeaderComponent } from './block-header/block-header.component';
import { BlockComponent } from './block/block.component';
import { MerkleTreeComponent } from './merkle-tree/merkle-tree.component';
import { TransactionComponent } from './transaction/transaction.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hashfunction', component: HashFunctionComponent },
  { path: 'signatures', component: SignatureComponent },
  { path: 'merkletree', component: MerkleTreeComponent },
  { path: 'blockheader', component: BlockHeaderComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'block', component: BlockComponent },
];