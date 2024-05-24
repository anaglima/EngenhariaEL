import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EstoqueComponent } from './estoque.component';
import { EstoqueRoutes } from './estoque.routing';
import { MaterialModule } from '../shared/material-module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(EstoqueRoutes)
  ],
  declarations: [EstoqueComponent]
})
export class EstoqueModule { }
