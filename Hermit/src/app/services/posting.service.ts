import { Injectable } from '@angular/core';
import Post from '../postings/model/post.model'
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})

/**
 * This service is responsible for sending and receiving posts.
 */
export class PostingService {

  constructor(private http:HttpClient) { }
  private posts:Post[]=[];
  private postBroadcaster= new Subject<Post[]>();
  private  endpoint:string ="http://localhost:3000/api/posts/";
  
  getPosts(){
    this.http.get<{message:String, posts:any[]}>(this.endpoint)
    .pipe(map((postData)=>{
      return {
        message:postData.message,
        posts:postData.posts.map((post)=>{
            return{
              Title:post.Title,
              User:post.User,
              Community:post.Community,
              Content:post.Content,
              Id:post._id,
            }
        })
      }
    }))
    .subscribe((postData)=>{
      this.posts=postData.posts.reverse();
      this.postBroadcaster.next([...this.posts]);
    });
  }
  addPost( Title:string, User:string, Community:string, Content:string, ){
    let post:Post ={Title:Title, Community:Community, Content:Content, User:User}
    
    this.http.post<{_id:string}>(this.endpoint, post)
    .subscribe((responseData)=>{
      post.Id=responseData._id;
      this.posts.unshift(post);
      this.postBroadcaster.next([...this.posts]);
    });
    
  }

  deletePost(Id:string){
    this.http.delete<{message:string}>(this.endpoint+Id)
    .subscribe(()=>{
      //remove from local list of hosts on success
      this.posts=this.posts.filter((post)=>{
          return post.Id!==Id
      })
      this.postBroadcaster.next([...this.posts]);
    })
  }


  getPostUpdateListener():Observable<Post[]> {
    return this.postBroadcaster.asObservable();
  }
}
