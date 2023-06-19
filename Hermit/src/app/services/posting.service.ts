import { Injectable } from '@angular/core';
import Post from '../postings/model/post.model'
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http:HttpClient) { }
  private posts:Post[]=[];
  private postBroadcaster= new Subject<Post[]>();
  private  endpoint:string ="http://localhost:3000/api/post";
  
  getPosts(){
    this.http.get<{message:String, posts:Post[]}>('http://localhost:3000/api/post')
    .subscribe((postData)=>{
      this.posts=postData.posts;
      this.postBroadcaster.next([...this.posts]);
    });
  }
  addPost( Title:string, User:string, Community:string, Content:string, ){
    const post ={Title:Title, Community:Community, Content:Content, User:User}
    
    this.http.post<{message:string}>(this.endpoint, post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postBroadcaster.next([...this.posts]);
    });
    
  }
  getPostUpdateListener():Observable<Post[]> {
    return this.postBroadcaster.asObservable();
  }
  likes = 0
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
}
