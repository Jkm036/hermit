import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostingsComponent } from './postings/postings.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { PostModalComponent } from './shared/post-modal/post-modal.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community/community.component';

/**
 * Configs the routing to the respective components
 */
const appRoute: Routes = [
  { path: '', component: PostingsComponent },
  { path: 'home', redirectTo: '' },
  { path: 'community', component: CommunityComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PostingsComponent,
    SidemenuComponent,
    SettingsComponent,
    PostModalComponent,
    ErrorComponent,
    CommunityComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
