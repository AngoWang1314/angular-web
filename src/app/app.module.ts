import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppComponent } from './pages/index/index.component';
import { FirstComponent } from './components/first/first.component';
import { ChildAComponent } from './components/child-a/child-a.component';
import { ChildBComponent } from './components/child-b/child-b.component';
import { SecondComponent } from './components/second/second.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/first-component/child-a',
    pathMatch: 'full',
  },
  {
    path: 'first-component',
    component: FirstComponent,
    children: [
      {
        path: 'child-a',
        component: ChildAComponent,
      },
      {
        path: 'child-b',
        component: ChildBComponent,
      },
      {
        path: '**',
        redirectTo: 'child-a',
      },
    ]
  },
  {
    path: 'second-component',
    component: SecondComponent,
  },
  {
    path: 'three-component',
    loadChildren: () => import('./test.module').then(m => m.TestModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AppComponent,
    FirstComponent,
    ChildAComponent,
    ChildBComponent,
    SecondComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: environment.production }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
