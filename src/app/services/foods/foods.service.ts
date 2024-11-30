//#region Imports

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { FoodProxy } from '../../models/proxies/food.proxy';
import { getCrudErrors } from '../../shared/functions';
import { FoodPayload } from '../../models/payloads/food.payload';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class FoodsService {

  //#region Constructor

  constructor(
    protected readonly firestore: AngularFirestore,
  ) {
    this.form = this.firestore.collection('foods');
  }

  //#endregion

  //#region Private Properties

  private form: AngularFirestoreCollection<FoodProxy | FoodPayload>;

  //#endregion

  //#region Public Methods

  public getAll(): Promise<FoodProxy[]> {
    return new Promise(resolve => {
      try {
        this.form.snapshotChanges().subscribe(foods => {
          const result: FoodProxy[] = foods.map(food => {
            const foodId = food.payload.doc.id;
            const foodData = food.payload.doc.data();

            return {
              id: foodId,
              name: foodData.name,
              description: foodData.description,
              carb: foodData.carb,
              fat: foodData.fat,
              protein: foodData.protein,
              kcal: foodData.kcal,
            };
          });

          resolve(result);
        });
      } catch (error) {
        throw Error(getCrudErrors(error)[0]);
      }
    });
  }

  public getById(itemId: string): Promise<FoodProxy> {
    return new Promise(resolve => {
      try {
        this.form.doc(itemId)
          .valueChanges()
          .subscribe((item: FoodProxy) => resolve(item));
      } catch (error) {
        throw Error(getCrudErrors(error)[0]);
      }
    });
  }

  public async createOne(payload: FoodPayload): Promise<void> {
    try {
      await this.form.add(payload);
    } catch (error) {
      throw Error(getCrudErrors(error)[0]);
    }
  }

  public async updateOne(itemId: string, payload: FoodPayload): Promise<void> {
    try {
      await this.form.doc(itemId).update(payload);
    } catch (error) {
      throw Error(getCrudErrors(error)[0]);
    }
  }

  public async deleteOne(itemId: string): Promise<void> {
    try {
      await this.form.doc(itemId).delete();
    } catch (error) {
      throw Error(getCrudErrors(error)[0]);
    }
  }

  //#endregion

}
