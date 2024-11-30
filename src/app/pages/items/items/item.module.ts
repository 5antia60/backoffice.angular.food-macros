import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbTooltipModule
} from '@nebular/theme';
import { CreateItemComponent } from './create-item.component';
import { UpdateItemComponent } from './update-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
  exports: [
    CreateItemComponent,
    UpdateItemComponent,
  ],
  declarations: [
    CreateItemComponent,
    UpdateItemComponent,
  ],
})
export class ItemModule {}
