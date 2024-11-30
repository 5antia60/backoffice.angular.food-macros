//#region Imports

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ItemProxy } from '../../models/proxies/item.proxy';
import { getCrudErrors } from '../../shared/functions';
import { ItemPayload } from '../../models/payloads/item.payload';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  //#region Constructor

  constructor(
    protected readonly firestore: AngularFirestore,
  ) {
    this.form = this.firestore.collection('items');
  }

  //#endregion

  //#region Private Properties

  private form: AngularFirestoreCollection<ItemProxy | ItemPayload>;

  //#endregion

  //#region Public Methods

  public getAll(): Promise<ItemProxy[]> {
    return new Promise(resolve => {
      try {
        this.form.snapshotChanges().subscribe(items => {
          const result: ItemProxy[] = items.map(item => {
            const itemId = item.payload.doc.id;
            const itemData = item.payload.doc.data();

            return {
              id: itemId,
              name: itemData.name,
              description: itemData.description,
              lastUpdate: new Date(itemData.lastUpdate.seconds * 1000),
              weight: itemData.weight,
            };
          });

          resolve(result);
        });
      } catch (error) {
        throw Error(getCrudErrors(error)[0]);
      }
    });
  }

  public getById(itemId: string): Promise<ItemProxy> {
    return new Promise(resolve => {
      try {
        this.form.doc(itemId)
          .valueChanges()
          .subscribe((item: ItemProxy) => resolve(item));
      } catch (error) {
        throw Error(getCrudErrors(error)[0]);
      }
    });
  }

  public async createOne(payload: ItemPayload): Promise<void> {
    try {
      await this.form.add(payload);
    } catch (error) {
      throw Error(getCrudErrors(error)[0]);
    }
  }

  public async updateOne(itemId: string, payload: ItemPayload): Promise<void> {
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
