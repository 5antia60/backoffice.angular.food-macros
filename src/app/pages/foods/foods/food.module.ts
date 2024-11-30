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
import { CreateFoodComponent } from './create-food.component';
import { UpdateFoodComponent } from './update-food.component';
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
    CreateFoodComponent,
    UpdateFoodComponent,
  ],
  declarations: [
    CreateFoodComponent,
    UpdateFoodComponent,
  ],
})
export class FoodModule {}
