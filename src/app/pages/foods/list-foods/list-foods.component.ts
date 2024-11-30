//#region Imports

import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FoodProxy } from '../../../models/proxies/food.proxy';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FoodsService } from '../../../services/foods/foods.service';

//#endregion

@Component({
  selector: 'ngx-list-foods',
  templateUrl: './list-foods.component.html',
})
export class ListFoodsComponent implements OnInit {

  //#region Constructor

  constructor(
    protected readonly toast: NbToastrService,
    protected readonly firestore: AngularFirestore,
    protected readonly foodsService: FoodsService,
  ) { }

  //#endregion

  //#region Public Properties

  public isLoading: boolean = false;

  public listFoods: FoodProxy[] = [];

  public displayedColumns: string[] = [
    'name',
    'description',
    'kcal',
    'actions',
  ];

  //#endregion

  //#region Public Methods

  public async ngOnInit(): Promise<void> {
    await this.loadFoods();
  }

  public async deleteFood(foodId: string): Promise<void> {
    this.isLoading = true;

    try {
      await this.foodsService.deleteOne(foodId);
      this.toast.success('O alimento foi excluido com sucesso.', 'Sucesso!');

      await this.loadFoods();
    } catch (error) {
      this.toast.danger('Houve um erro ao excluir o alimento.', 'Oops...');
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

  //#region Private Methods

  private async loadFoods(): Promise<void> {
    this.isLoading = true;

    try {
      this.listFoods = await this.foodsService.getAll();
    } catch (error) {
      this.toast.danger('Houve um erro ao carregar informações.', 'Oops...');
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

}
