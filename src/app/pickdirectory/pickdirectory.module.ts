import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickdirectoryPageRoutingModule } from './pickdirectory-routing.module';

import { PickdirectoryPage } from './pickdirectory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickdirectoryPageRoutingModule
  ],
  declarations: [PickdirectoryPage]
})
export class PickdirectoryPageModule {}
