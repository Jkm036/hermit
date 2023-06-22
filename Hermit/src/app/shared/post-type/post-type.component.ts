import { Component, EventEmitter, Input,Output } from '@angular/core';
import { PostingService } from 'src/app/services/posting.service';

@Component({
  selector: 'app-post-type',
  templateUrl: './post-type.component.html',
  styleUrls: ['./post-type.component.css']
})

/**
 * The reuseable component for each invidual post that is published
 */
export class PostTypeComponent {

  postingService: PostingService;
  @Input ('username')   username:String;
  @Input ('title')      title:String;
  @Input ('community')  community:String;
  @Output('onDelete')   onDelete= new EventEmitter
  @Input('id')         Id:string= 'noIdProvided';
  /**
   * Initilizes the connection of the component to the service where 
   * all of the business happens. 
   * 
   * @param postingservice The logic for the posting service
   */
  constructor(postingservice:PostingService) {
    this.postingService = postingservice;
  }
  delete(id:string){
    this.onDelete.emit(id);

  }
}
