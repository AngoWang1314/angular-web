import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

import { TestComponent } from './components/test/test.component';
import { MyPersonComponent } from './components/my-person/my-person.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  }
]

@NgModule({
  declarations: [
    TestComponent,
    MyPersonComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzButtonModule,
    NzCascaderModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class TestModule { }
