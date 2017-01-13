import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MasonryModule } from 'angular2-masonry';
import { TagInputModule } from 'ng2-tag-input';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { AdsenseModule } from 'ng2-adsense';
import { MaterialModule } from '@angular/material';
import { routes, routing, appRoutingProviders }  from './app.routes';
import { NgUploaderModule } from 'ngx-uploader';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import {NgPipesModule} from 'ngx-pipes';
import { AppComponent } from './app.component';
import { Store } from './store';
import { SERVICE_PROVIDER } from './services'
import { 
  HeaderComponent, 
  FooterComponent, 
  UploaderComponent,
  CardComponent,
  ColorpickerComponent,
  ListcreatorComponent
} from './components/shared';
import { 
  HomeComponent,
  SignupComponent, 
  AboutComponent,
  GetingstartedComponent,
  ListComponent,
  NotfoundComponent,
  ProfileComponent
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
    CardComponent,
    ColorpickerComponent,
    ListcreatorComponent,
    ListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    NgUploaderModule,
    Ng2DropdownModule,
    NgPipesModule
  ],
  providers: [
  ...SERVICE_PROVIDER,
  Store,
  AnimationService
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
