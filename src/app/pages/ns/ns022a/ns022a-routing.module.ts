import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns022aComponent } from './ns022a.component';
import { Ns0221aComponent } from './ns0221a/ns0221a.component';
import { Ns0222aComponent } from './ns0222a/ns0222a.component';
import { Ns0223aComponent } from './ns0223a/ns0223a.component';

const routes: Routes = [
  {
    path: '',
    component: Ns022aComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns022a1'
      },
      {
        path: 'ns022a1',
        component: Ns0221aComponent
      },
      {
        path: 'ns022a2',
        component: Ns0222aComponent
      },
      {
        path: 'ns022a3',
        component: Ns0223aComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns022aRoutingModule { }
