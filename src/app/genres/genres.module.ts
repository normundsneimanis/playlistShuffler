import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenresPageRoutingModule } from './genres-routing.module';

import { GenresPage } from './genres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GenresPageRoutingModule
  ],
  declarations: [GenresPage]
})
export class GenresPageModule {}
