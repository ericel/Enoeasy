import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  SignupComponent, 
  AboutComponent,
  GetingstartedComponent,
  HomeComponent,
  NotfoundComponent,
  ProfileComponent,
  EdituserComponent,
  AddComponent,
  PageComponent,
  BlogComponent,
  BlogPageComponent
} from './components/containers';
import { AuthService } from './services/auth/auth.service';
export const routes: Routes = [
   {
    path: 'home',
    component: HomeComponent,
     data: {
       meta: {
        title: 'Africa #1 Website',
        description: 'One place web from mama Africa. Afro music, videos, blogs, news. All in one place.',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
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
        title: 'About Us',
        description: 'Enoeasy derived from the common African slang E No Easy!'
      }
    }
  },
  {
   path: 'gettingstarted',
   component: GetingstartedComponent,
    data: {
      meta: {
        title: 'Home page',
        description: 'Description of the home page'
      }
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
   path: 'blog/:string/:id/:string',
   component: BlogPageComponent
  },
   {
   path: 'add',
   component: AddComponent,
   canActivate: [AuthService],
     data: {
      meta: {
        title: 'Write a blog',
        description: 'Publish a blog with us for free'
      }
    }
  },
  {
   path: 'add/blog',
   component: BlogComponent,
   canActivate: [AuthService],
    data: {
      meta: {
        title: 'Write a blog',
        description: 'Publish a blog with us for free'
      }
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