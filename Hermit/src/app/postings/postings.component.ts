import { PostingService } from './../services/posting.service';
import { Component } from '@angular/core';
import Post from './model/post.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.css'],
  host:{
    "(window:click)" :  "showModal=false;"
  }
})
export class PostingsComponent {
  posts:Post[]=[];
  private postsSub:Subscription;
  constructor(public postservice:PostingService){}
  showModal=false;

  ngOnInit(){
    this.postservice.getPosts();
    this.postsSub=this.postservice.getPostUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts=posts;
    })
    
  }
 toggleModal($event){
  this.showModal=!this.showModal;
  $event.stopPropagation();
  
 }
}
