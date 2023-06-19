import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from './post-type/post-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FilterComponent } from './filter/filter.component';


/**
 * Shared module is usually responsible for gathering components that are 
 * reuseable and is shared throughout the application. 
 * 
 * If you want to create a new component that will be shared between different 
 * areas of the application, make sure to add that component within this module. 
 * 
 * You will need to export that component under "exports" in order to use it in 
 * other areas of the application. 
 */
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
