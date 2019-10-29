import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns03Component } from './ns03.component';
import { Ns031Component } from './ns031/ns031.component';
import { Ns032Component } from './ns032/ns032.component';


const routes: Routes = [
  {
    path: '',
    component: Ns03Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns031'
      },
      {
        path: 'ns031',
        component: Ns031Component
      },
      {
        path: 'ns032',
        component: Ns032Component
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns03RoutingModule { }
