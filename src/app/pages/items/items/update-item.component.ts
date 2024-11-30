//#region Imports

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseItemComponent } from './base-item.component';
import { getCrudErrors } from '../../../shared/functions';
import { ItemsService } from '../../../services/items/items.service';

//#endregion

@Component({
  selector: 'ngx-update-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class UpdateItemComponent extends BaseItemComponent implements OnInit {

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

  //#region Public Functions

  public async ngOnInit(): Promise<void> {
    this.showLoading = true;

    const entityId = this.route.snapshot.paramMap.get('entityId');
    const entity = await this.itemsService.getById(entityId);

    this.formGroup.controls.name.setValue(entity.name);
    this.formGroup.controls.lastUpdate.setValue(entity.lastUpdate);
    this.formGroup.controls.description.setValue(entity.description);
    this.formGroup.controls.weight.setValue(entity.weight);

    this.showLoading = false;
  }

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const entityId = this.route.snapshot.paramMap.get('entityId');
      const payload = this.formGroup.getRawValue();

      await this.itemsService.updateOne(entityId, payload);

      this.toast.success('Item atualizado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger(getCrudErrors(error)[0], 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion

}
