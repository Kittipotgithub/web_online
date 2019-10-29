import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns021Component } from './ns021.component';
import { Ns0211Component } from './ns0211/ns0211.component';
import { Ns0212Component } from './ns0212/ns0212.component';
import { Ns0213Component } from './ns0213/ns0213.component';

const routes: Routes = [
  {
    path: '',
    component: Ns021Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns0211'
      },
      {
        path: 'ns0211',
        component: Ns0211Component
      },
      {
        path: 'ns0212',
        component: Ns0212Component
      },
      {
        path: 'ns0213',
        component: Ns0213Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns021RoutingModule { }
