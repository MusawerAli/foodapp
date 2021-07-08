import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './chef.component';
import { MenuesComponent } from './menues/menues.component';

const routes: Routes = [
  { path: '', redirectTo: 'chef', pathMatch: 'full' },
  {
    path: 'chef',
    component: ChefComponent,
  },
  {
    path: 'menue',
    component: MenuesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
