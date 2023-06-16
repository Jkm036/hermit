import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from './post-type/post-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    PostTypeComponent,
    ModalComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ], exports: [
    PostTypeComponent,
    ModalComponent,
    FilterComponent
  ]
})
export class SharedModule { }
