import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingService } from './services/posting.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
 