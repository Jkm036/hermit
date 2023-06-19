import { Component,Output,EventEmitter } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { PostingService } from 'src/app/services/posting.service';
@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  @Output('close') close     = new EventEmitter();
 constructor(private postingservice:PostingService){}
 postform:FormGroup
  ngOnInit(){
    this.postform= new FormGroup({
      Title:       new FormControl(),
      Content:     new FormControl(),
      Community:   new FormControl
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
  postPost(){
    this.postingservice.addPost(this.TitleField.value, "Josh's biggest fan", this.CommuntiyField.value, this.ContentField.value,);
  }
}
