import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';
import { ListFoodsComponent } from './list-foods.component';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    RouterModule,
    NbSpinnerModule,
    FormsModule,
    NbTooltipModule,
    NbIconModule,
    NbPopoverModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    ListFoodsComponent,
  ],
  declarations: [
    ListFoodsComponent,
  ],
})
export class ListFoodsModule {}
