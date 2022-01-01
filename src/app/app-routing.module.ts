import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.module').then( m => m.GenresPageModule)
  },
  {
    path: 'properties/:id',
    loadChildren: () => import('./properties/properties.module').then( m => m.PropertiesPageModule)
  },
  {
    path: 'pickproperties',
    loadChildren: () => import('./pickproperties/pickproperties.module').then( m => m.PickpropertiesPageModule)
  },
  {
    path: 'pickdirectory',
    loadChildren: () => import('./pickdirectory/pickdirectory.module').then( m => m.PickdirectoryPageModule)
  },
  {
    path: 'pickdirectory/:id',
    loadChildren: () => import('./pickdirectory/pickdirectory.module').then( m => m.PickdirectoryPageModule)
  },
  {
    path: 'pickdirectory/:id/:folder',
    loadChildren: () => import('./pickdirectory/pickdirectory.module').then( m => m.PickdirectoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
