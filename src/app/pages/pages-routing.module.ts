import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'items',
      pathMatch: 'full',
    },
    {
      path: 'items',
      loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
    },
    {
      path: '**',
      redirectTo: 'items',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
