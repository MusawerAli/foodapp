import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChefRoutingModule } from './chef-routing.module';
import { ChefComponent } from './chef.component';
import { MenuesComponent } from './menues/menues.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    ChefComponent,
    MenuesComponent,

  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class ChefModule { }
