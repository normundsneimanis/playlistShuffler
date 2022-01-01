import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickpropertiesPage } from './pickproperties.page';

const routes: Routes = [
  {
    path: '',
    component: PickpropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickpropertiesPageRoutingModule {}
