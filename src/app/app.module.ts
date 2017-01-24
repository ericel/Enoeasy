import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ng2-tag-input';
import {MomentModule} from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { AdsenseModule } from 'ng2-adsense';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { routes, routing, appRoutingProviders }  from './app.routes';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
//import { MetaModule, MetaConfig } from 'ng2-meta';
import {NgPipesModule} from 'ngx-pipes';
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
  DialogShare,
  CommentCard,
  CommentsCard
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



/*const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Enoeasy'
  }
};*/

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
    PageComponent,
    CommentCard,
    CommentsCard
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
     AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    MaterialModule.forRoot(),
    TagInputModule,
    RouterModule.forRoot(routes, {  }),
    //MetaModule.forRoot(metaConfig),
    NgPipesModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqIrNb1DLsN6oP97ua3YLMJx5-gUueWJU',
      libraries: ['places']
    }),
    Ng2DropdownModule
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
