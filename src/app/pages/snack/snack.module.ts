import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnackComponent } from './snack.component';
import { CommonModule } from '@angular/common';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbIconModule,
  NbInputModule, NbListModule,
  NbSelectWithAutocompleteModule,
  NbSpinnerModule, NbTooltipModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: SnackComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,
    NbSelectWithAutocompleteModule,
    NbAutocompleteModule,
    FormsModule,
    MatTableModule,
    NbIconModule,
    NbTooltipModule,
    NbListModule,
  ],
  exports: [SnackComponent],
  declarations: [SnackComponent],
})
export class SnackModule {}
