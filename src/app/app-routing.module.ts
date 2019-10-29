import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from '@pages/user-login/user-login.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },

 

  { path: 'ns01', loadChildren: () => import('./pages/ns/ns01/ns01.module').then(m => m.Ns01Module) },
  { path: 'ns03', loadChildren: () => import('./pages/ns/ns03/ns03.module').then(m => m.Ns03Module) },
  { path: 'ns021', loadChildren: () => import('./pages/ns/ns021/ns021.module').then(m => m.Ns021Module) },
  { path: 'ns022', loadChildren: () => import('./pages/ns/ns022/ns022.module').then(m => m.Ns022Module) },
  { path: 'ns021a', loadChildren: () => import('./pages/ns/ns021a/ns021a.module').then(m => m.Ns021aModule) },
  { path: 'ns022a', loadChildren: () => import('./pages/ns/ns022a/ns022a.module').then(m => m.Ns022aModule) },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
