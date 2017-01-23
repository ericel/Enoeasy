import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  SignupComponent, 
  AboutComponent,
  GetingstartedComponent,
  HomeComponent,
  NotfoundComponent,
  ListComponent,
  ProfileComponent,
  EdituserComponent,
  AddComponent,
  PageComponent
} from './components/containers';
import { AuthService } from './services/auth/auth.service';
export const routes: Routes = [
   {
    path: 'home',
    component: HomeComponent,
     data: {
      meta: {
        title: 'Dashboard',
        description: 'Description of the dashboard page',
        'og:image': 'http://example.com/dashboard-image.png'
      }
    }
  },
  {
   path: '',
   redirectTo: '/home',
   pathMatch: 'full'
  },
  {
   path: 'about',
   component: AboutComponent,
    data: {
      meta: {
        title: 'Dashboard',
        description: 'Description of the dashboard page',
        'og:image': 'http://example.com/dashboard-image.png'
      }
    }
  },
  {
   path: 'gettingstarted',
   component: GetingstartedComponent,
    data: {
      title: 'Start from here'
    }
  },
  {
   path: 'signup',
   component: SignupComponent,
    data: {
      title: 'Sign in | Sign up to your free account'
    }
  },
  {
   path: 'user/:id/:string',
   component: ProfileComponent
  },
  {
   path: 'edit/:id/:string',
   component: EdituserComponent,
   canActivate: [AuthService],
   data: {
      title: 'Edit Profile'
    }
  },
  {
   path: ':string/:id/:string',
   component: PageComponent
  },
  {
   path: 'list',
   component: ListComponent,
   canActivate: [AuthService],
    data: {
      title: 'List a a business'
    }
  },
   {
   path: 'add',
   component: AddComponent,
   canActivate: [AuthService],
    data: {
      title: 'Add content'
    }
  },
  {path: 'NotFound404', 
  component: NotfoundComponent,
  data: {
      title: '404 Page Not FOund'
    } },
  {path: '**', redirectTo: '/NotFound404'}
 
];
export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);