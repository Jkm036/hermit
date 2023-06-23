import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
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
  @Input ('username')   username:string;
  @Input ('title')      title:string;
  @Input ('community')  community:string;
  @Output('onDelete')   onDelete= new EventEmitter
  @Input('id')         Id:string= 'noIdProvided';
  status: string 

  constructor(private data: CommunityService) {
    
  }
  delete(id:string){
    this.onDelete.emit(id);

  }

  likes = Math.floor(Math.random() * 10)
  likeFill = 'white'
  dislikeFill = 'white'
  fill = 'white'

  like() {
    if (this.dislikeFill === '#ff051a') {
      this.dislikeFill = 'white'
      this.likes += 1
    }
    else if (this.likeFill === 'white') {
      this.likes += 1
      this.likeFill = '#05ff65'
    } else {
        this.likes -= 1
        this.likeFill = 'white'
    }
  }

  dislike() {
    if (this.likeFill === '#05ff65') {
      this.likeFill = 'white'
      this.likes -= 1
    }
    else if  (this.dislikeFill === 'white') {
      this.likes -= 1
      this.dislikeFill = '#ff051a'
    } else {
      this.likes += 1
      this.dislikeFill = 'white'
    }
  }

    /**
   * Whenever the user clicks on a community on the sidemenu, it will trigger this 
   * init and read the name of the status. 
   */
    ngOnInit() {
      this.data.currentStatus.subscribe(status => this.status = status)
    }
  
    /**
     * This function will set the name of the community to the service.
     * 
     * @param guildName The name of the community 
     */
    changeStatus(guildName: string) {
      this.data.changeStatus(guildName)
    }
}
