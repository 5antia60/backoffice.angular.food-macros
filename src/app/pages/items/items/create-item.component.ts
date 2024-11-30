//#region Imports

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseItemComponent } from './base-item.component';
import { ItemsService } from '../../../services/items/items.service';

//#endregion

@Component({
  selector: 'ngx-create-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class CreateItemComponent extends BaseItemComponent {

  //#region Constructor

  constructor(
    protected readonly router: Router,
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    itemsService: ItemsService,
    toast: NbToastrService,
  ) {
    super(formBuilder, route, itemsService, toast);
  }

  //#endregion

  //#region Public Methods

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const payload = this.formGroup.getRawValue();
      await this.itemsService.createOne(payload);

      this.toast.success('Item criado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger('Houve um erro ao criar o item', 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion
}
