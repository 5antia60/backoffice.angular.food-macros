//#region Imports

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseFoodComponent } from './base-food.component';
import { getCrudErrors } from '../../../shared/functions';
import { FoodsService } from '../../../services/foods/foods.service';

//#endregion

@Component({
  selector: 'ngx-update-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class UpdateFoodComponent extends BaseFoodComponent implements OnInit {

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

  //#region Public Functions

  public async ngOnInit(): Promise<void> {
    this.showLoading = true;

    const entityId = this.route.snapshot.paramMap.get('entityId');
    const entity = await this.foodsService.getById(entityId);

    this.formGroup.controls.name.setValue(entity.name);
    this.formGroup.controls.description.setValue(entity.description);
    this.formGroup.controls.carb.setValue(entity.carb);
    this.formGroup.controls.fat.setValue(entity.fat);
    this.formGroup.controls.protein.setValue(entity.protein);
    this.formGroup.controls.kcal.setValue(entity.kcal);

    this.showLoading = false;
  }

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const entityId = this.route.snapshot.paramMap.get('entityId');
      const payload = this.formGroup.getRawValue();

      await this.foodsService.updateOne(entityId, payload);

      this.toast.success('Alimento atualizado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger(getCrudErrors(error)[0], 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion

}
