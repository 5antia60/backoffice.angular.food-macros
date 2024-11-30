//#region Imports

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodsService } from '../../services/foods/foods.service';
import { NbToastrService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodProxy } from '../../models/proxies/food.proxy';

//#endregion

@Component({
  selector: 'ngx-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
})
export class SnackComponent implements OnInit {

  //#region Constructor

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly foodsService: FoodsService,
    protected readonly toast: NbToastrService,
  ) {
    this.backUrl = '/pages/foods';

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

  @ViewChild('autoInput')
  public inputRef: ElementRef;

  public showLoading: boolean;
  public backUrl: string;
  public formGroup: FormGroup;

  public selectedFood?: FoodProxy;

  public foodsList?: { food: FoodProxy, grams: number }[] = [];

  public selectedGrams?: number;

  public foods: FoodProxy[] = [];

  public filteredFoods$: Observable<FoodProxy[]>;

  //endregion

  //#region Public Methods

  public async ngOnInit(): Promise<void> {
    this.showLoading = true;

    this.foods = await this.foodsService.getAll();
    this.filteredFoods$ = of(this.foods);

    this.showLoading = false;
  }

  private filter(value: string): FoodProxy[] {
    if (typeof value !== 'string')
      return this.foods;

    const filterValue = value.toLowerCase();
    return this.foods.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
  }

  public getFilteredOptions(value: string): Observable<FoodProxy[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  public onChange(): void {
    this.filteredFoods$ = this.getFilteredOptions(this.inputRef.nativeElement.value);
  }

  public onSelectionChange(food: FoodProxy): void {
    this.inputRef.nativeElement.value = food.name;
    this.filteredFoods$ = this.getFilteredOptions(food.name);

    this.selectedFood = food;
  }

  public addFood(): void {
    this.foodsList.push({
      food: this.selectedFood,
      grams: this.selectedGrams,
    });

    this.selectedFood = undefined;
    this.selectedGrams = undefined;
    this.inputRef.nativeElement.value = '';
  }

  public removeFood(name: string): void {
    console.log('remove', name);
  }

  public onSubmit(): void {
    console.log('onSubmit');
  }

  //#endregion

}
