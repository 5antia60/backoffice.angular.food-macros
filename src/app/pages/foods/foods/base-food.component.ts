//#region Imports

import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { FoodsService } from '../../../services/foods/foods.service';

//#endregion

@Directive()
export class BaseFoodComponent {

  //#region Constructor

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly route: ActivatedRoute,
    protected readonly foodsService: FoodsService,
    protected readonly toast: NbToastrService,
  ) {
    this.backUrl = '/pages/foods';
    this.isUpdate = route.snapshot.paramMap.has('entityId');

    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      carb: [Validators.required],
      fat: [Validators.required],
      protein: [Validators.required],
      kcal: [Validators.required],
    });
  }

  //#endregion

  //#region Public Properties

  public showLoading: boolean;
  public backUrl: string;
  public formGroup: FormGroup;

  public isUpdate: boolean = false;

  //endregion

}
