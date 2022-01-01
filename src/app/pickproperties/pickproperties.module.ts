import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickpropertiesPageRoutingModule } from './pickproperties-routing.module';

import { PickpropertiesPage } from './pickproperties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickpropertiesPageRoutingModule
  ],
  declarations: [PickpropertiesPage]
})
export class PickpropertiesPageModule {}
