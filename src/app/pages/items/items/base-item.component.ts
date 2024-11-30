//#region Imports

import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ItemsService } from '../../../services/items/items.service';

//#endregion

@Directive()
export class BaseItemComponent {

  //#region Constructor

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly route: ActivatedRoute,
    protected readonly itemsService: ItemsService,
    protected readonly toast: NbToastrService,
  ) {
    this.backUrl = '/pages/items';
    this.isUpdate = route.snapshot.paramMap.has('entityId');

    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      lastUpdate: [new Date()],
      description: [''],
      weight: ['', Validators.required],
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
