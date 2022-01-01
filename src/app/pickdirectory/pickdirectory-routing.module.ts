import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickdirectoryPage } from './pickdirectory.page';

const routes: Routes = [
  {
    path: '',
    component: PickdirectoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickdirectoryPageRoutingModule {}
