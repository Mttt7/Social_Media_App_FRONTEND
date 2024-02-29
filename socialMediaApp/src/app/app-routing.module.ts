import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Post } from './models/Post';
import { PostFullSizeComponent } from './components/post-full-size/post-full-size.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'users/:userId', component: UserProfileComponent },

  { path: 'settings', component: SettingsComponent },

  { path: 'posts/:id', component: PostFullSizeComponent },

  { path: 'home', redirectTo: '/home/feed', pathMatch: 'full' },
  { path: 'home/:feedType', component: HomeComponent },

  { path: 'register', component: RegisterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
