import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

import { firebaseConfig } from './environments/firebase.environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DialogModule } from 'primeng/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Card, CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { AutoFocusModule } from 'primeng/autofocus';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BadgeModule } from 'primeng/badge';

import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { MessageService } from 'primeng/api';
import { AddPostDialogComponent } from './dialogs/add-post-dialog/add-post-dialog.component';
import { EditPostDialogComponent } from './dialogs/edit-post-dialog/edit-post-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { SettingsComponent } from './components/settings/settings.component';
import { PostFullSizeComponent } from './components/post-full-size/post-full-size.component';
import { CommentComponent } from './components/comment/comment.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    PostComponent,
    UserBadgeComponent,
    AddPostDialogComponent,
    EditPostDialogComponent,
    UserProfileComponent,
    SettingsComponent,
    PostFullSizeComponent,
    CommentComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextareaModule,
    PickerComponent,
    OverlayPanelModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    MatDialogModule,
    CardModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    TabMenuModule,
    AccordionModule,
    InputTextModule,
    TooltipModule,
    DividerModule,
    AutoFocusModule,
    RadioButtonModule,
    BadgeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
