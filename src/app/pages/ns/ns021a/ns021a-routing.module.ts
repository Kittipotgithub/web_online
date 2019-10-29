import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns021aComponent } from './ns021a.component';
import { Ns0211aComponent } from './ns0211a/ns0211a.component';
import { Ns0212aComponent } from './ns0212a/ns0212a.component';
import { Ns0213aComponent } from './ns0213a/ns0213a.component';

const routes: Routes = [
  {
    path: '',
    component: Ns021aComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns021a1'
      },
      {
        path: 'ns021a1',
        component: Ns0211aComponent
      },
      {
        path: 'ns021a2',
        component: Ns0212aComponent
      },
      {
        path: 'ns021a3',
        component: Ns0213aComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns021aRoutingModule { }
