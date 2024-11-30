import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodModule } from './foods/food.module';
import { CreateFoodComponent } from './foods/create-food.component';
import { UpdateFoodComponent } from './foods/update-food.component';
import { FoodsComponent } from './foods.component';
import { ListFoodsComponent } from './list-foods/list-foods.component';
import { ListFoodsModule } from './list-foods/list-foods.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FoodsComponent,
        children: [
          { path: '', component: ListFoodsComponent },
          { path: 'create', component: CreateFoodComponent },
          { path: ':entityId', component: UpdateFoodComponent },
        ],
      },
    ]),
    ListFoodsModule,
    FoodModule,
  ],
  declarations: [FoodsComponent],
})
export class FoodsModule {}
