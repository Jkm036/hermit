import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from './post-type/post-type.component';

@NgModule({
  declarations: [
    PostTypeComponent,
  ],
  imports: [
    CommonModule
  ], exports: [
    PostTypeComponent
  ]
})
export class SharedModule { }
 