import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'hashfunction', component: HashFunctionComponent },
  { path: 'hashfunction', component: HashFunctionComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }