//#region Imports

import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ItemProxy } from '../../../models/proxies/item.proxy';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ItemsService } from '../../../services/items/items.service';

//#endregion

@Component({
  selector: 'ngx-list-items',
  templateUrl: './list-items.component.html',
})
export class ListItemsComponent implements OnInit {

  //#region Constructor

  constructor(
    protected readonly toast: NbToastrService,
    protected readonly firestore: AngularFirestore,
    protected readonly itemsService: ItemsService,
  ) { }

  //#endregion

  //#region Public Properties

  public isLoading: boolean = false;

  public listItems: ItemProxy[] = [];

  public displayedColumns: string[] = [
    'name',
    'lastUpdate',
    'weight',
    'actions',
  ];

  //#endregion

  //#region Public Methods

  public async ngOnInit(): Promise<void> {
    await this.loadItems();
  }

  public async deleteItem(itemId: string): Promise<void> {
    this.isLoading = true;

    try {
      await this.itemsService.deleteOne(itemId);
      this.toast.success('O item foi excluido com sucesso.', 'Sucesso!');

      await this.loadItems();
    } catch (error) {
      this.toast.danger('Houve um erro ao excluir o item.', 'Oops...');
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

  //#region Private Methods

  private async loadItems(): Promise<void> {
    this.isLoading = true;

    try {
      this.listItems = await this.itemsService.getAll();
    } catch (error) {
      this.toast.danger('Houve um erro ao carregar informações.', 'Oops...');
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

}
