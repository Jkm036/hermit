import { Component,Output,EventEmitter } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { PostingService } from 'src/app/services/posting.service';
import { imageValidator } from './image.validator';
@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  @Output('close') close     = new EventEmitter();
 constructor(private postingservice:PostingService){}
 postform:FormGroup;
 imagePreview:string;
 imageData:string=null;
  ngOnInit(){
    this.postform= new FormGroup({
      Title:       new FormControl('',[Validators.required]),
      Content:     new FormControl('',[Validators.required]),
      Community:   new FormControl('',[Validators.required]),
      Image:       new FormControl(null,[Validators.required], [imageValidator]),
    })
  }
 onClose($event){
  this.close.emit($event);

 }
  get TitleField(){
    return this.postform.get('Title');
  }
  get ContentField(){
    return this.postform.get('Content');
  }
  get CommuntiyField(){
    return this.postform.get('Community');
  }
  get ImageField(){
    return this.postform.get('Image');
  } 
  //TODO: work on account validation and storage and then display name of accounts 
  postPost(){
    this.postingservice.addPost(this.TitleField.value, "Josh's biggest fan", this.CommuntiyField.value, this.ContentField.value, this.ImageField.value);
  }

  // in the event that someone picked an image to be uploaded
  imagePicked(event:Event){
      //get file object from input (native object to javscript)
      const file= (event.target as HTMLInputElement).files[0];
       // change value of image field in fom to the file received by input
       this.postform.patchValue({Image: file});
       // run validators on image & recalculates the value and validation status of control
       this.ImageField.updateValueAndValidity();
       // object ot let web applicaation read files on a users personal device (asynchronously)
       const reader=new FileReader();
       //sets function that runs when the file reader is done reading a file
        reader.onload=()=>{
          const img= reader.result as string;
          this.imagePreview=img;
        }
    //a format that a
    reader.readAsDataURL(file);
  }
}
