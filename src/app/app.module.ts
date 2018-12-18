import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {

  MatIconModule, MatInputModule,
  MatAutocompleteModule, MatChipsModule,
  MatFormFieldModule,MatToolbarModule,
  MatCardModule,MatGridListModule,
  MatProgressSpinnerModule,MatSnackBarModule
} from '@angular/material';

import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const routes: Routes = [
  { path: 'search',  component: SearchComponent },
  { path: 'profile/:login', component: ProfileComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatIconModule, MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatToolbarModule,
    InfiniteScrollModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule

  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
