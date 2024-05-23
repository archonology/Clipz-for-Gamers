import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ManageComponent } from './video/manage/manage.component';
import { UploadComponent } from './video/upload/upload.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
// Angular 14+ you don't need RouterModules to handle child routes -- just use loadComponent here to reduce complexity and keep the lazy load benefits. Also, it says in the docs the RouterModule is still available, but with the new standalone first module structure, there are complications that I've yet to understand how to resolve.
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'manage',
        loadComponent: () => ManageComponent,
        data: {
            authOnly: true
        }
    },
    {
        path: 'upload',
        loadComponent: () => UploadComponent,
        data: {
            authOnly: true
        }
    },
    {
        path: 'clip/:id',
        component: ClipComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
