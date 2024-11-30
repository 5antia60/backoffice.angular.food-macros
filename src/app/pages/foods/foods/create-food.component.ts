//#region Imports

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseFoodComponent } from './base-food.component';
import { FoodsService } from '../../../services/foods/foods.service';

//#endregion

@Component({
  selector: 'ngx-create-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class CreateFoodComponent extends BaseFoodComponent {

  //#region Constructor

  constructor(
    protected readonly router: Router,
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    foodsService: FoodsService,
    toast: NbToastrService,
  ) {
    super(formBuilder, route, foodsService, toast);
  }

  //#endregion

  //#region Public Methods

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const payload = this.formGroup.getRawValue();
      await this.foodsService.createOne(payload);

      this.toast.success('Alimento criado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger('Houve um erro ao criar o alimento', 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion
}
