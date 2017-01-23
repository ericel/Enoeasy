import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MasonryModule } from 'angular2-masonry';
import { TagInputModule } from 'ng2-tag-input';
import {MomentModule} from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { AdsenseModule } from 'ng2-adsense';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { routes, routing, appRoutingProviders }  from './app.routes';
import { MetaModule } from 'ng2-meta';
import { NgUploaderModule } from 'ngx-uploader';
import {NgPipesModule} from 'ngx-pipes';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { AppComponent } from './app.component';
import { Store } from './store';
import { SERVICE_PROVIDER } from './services'
import { 
  HeaderComponent, 
  FooterComponent, 
  UploaderComponent,
  ColorpickerComponent,
  ListcreatorComponent,
  AdslistCard,
  AuthCard,
  PromoCard,
  HomeCard,
  StatusCard,
  ColorCard,
  AsideCard,
  UsersCard,
  QuestionCard,
  ShareCard,
  DialogAsk,
  DialogShare
} from './components/shared';
import { 
  HomeComponent,
  SignupComponent, 
  AboutComponent,
  GetingstartedComponent,
  ListComponent,
  NotfoundComponent,
  ProfileComponent,
  EdituserComponent,
  AddComponent,
  PageComponent
} from './components/containers';






// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDDZrLSmfW67BUfeDbl0oKhGKrEEc1DaVg",
    authDomain: "enoeasy-94b34.firebaseapp.com",
    databaseURL: "https://enoeasy-94b34.firebaseio.com",
    storageBucket: "enoeasy-94b34.appspot.com",
    messagingSenderId: "586504231618"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent, 
    AboutComponent,
    GetingstartedComponent,
    HomeComponent,
    NotfoundComponent,
    UploaderComponent,
    ColorpickerComponent,
    ListcreatorComponent,
    ListComponent,
    ProfileComponent,
    AdslistCard,
    EdituserComponent,
    AuthCard,
    PromoCard,
    HomeCard,
    StatusCard,
    ColorCard,
    AsideCard,
    AddComponent,
    UsersCard,
    QuestionCard,
    ShareCard,
    DialogAsk,
    DialogShare,
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    AdsenseModule,
    MaterialModule.forRoot(),
    MasonryModule,
    TagInputModule,
    RouterModule.forRoot(routes, {  }),
    MetaModule.forRoot(),
    NgUploaderModule,
    NgPipesModule,
    InfiniteScrollModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqIrNb1DLsN6oP97ua3YLMJx5-gUueWJU',
      libraries: ['places']
    })
  ],
  providers: [
  ...SERVICE_PROVIDER,
  Store,
  AnimationService
  ],
  entryComponents: [
    DialogAsk,
    DialogShare
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
