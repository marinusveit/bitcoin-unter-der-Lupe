import { Routes } from '@angular/router';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { HomeComponent } from './home/home.component';
import { SignatureComponent } from './signature/signature.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hashfunction', component: HashFunctionComponent },
  { path: 'signatures', component: SignatureComponent },
];