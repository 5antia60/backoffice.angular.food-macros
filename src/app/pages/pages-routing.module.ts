import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'foods',
      pathMatch: 'full',
    },
    {
      path: 'foods',
      loadChildren: () => import('./foods/foods.module').then(m => m.FoodsModule),
    },
    {
      path: 'snack',
      loadChildren: () => import('./snack/snack.module').then(m => m.SnackModule),
    },
    {
      path: '**',
      redirectTo: 'foods',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
