import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from './post-type/post-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    PostTypeComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ], exports: [
    PostTypeComponent,
    ModalComponent,
  ]
})
export class SharedModule { }
