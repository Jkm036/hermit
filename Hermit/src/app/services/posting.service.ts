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
  private endpoint:string ="http://localhost:3000/api/posts/";
  
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
              ImagePath: post.ImagePath,
              isImage: post.isImage,
              PhotoId: post.PhotoId,
              PhotoPath: post.PhotoPath,
              DataBase:true,
            }
        })
      }
    }))
    .subscribe((postData)=>{
      this.posts=postData.posts.reverse();
      this.postBroadcaster.next([...this.posts]);
    });
  }

  addPost( Title:string, User:string, Community:string, Content:string, Image:File, imageData:string){
    let isImage= (Image !=null);
    const post:Post = {
      Title:Title,
      User:User,
      Community: Community,
      Content: Content,
      PhotoId:null,
      PhotoPath: imageData,
      isImage: isImage,
      DataBase: false,
    } 
    this.posts.unshift(post);
    this.postBroadcaster.next([...this.posts]);

    //actual info we will send to databse
    const postData = new FormData();
    postData.append('Title', Title);
    postData.append('User',User );
    postData.append('Community', Community);
    postData.append('Content', Content);
    if(Image==null){
      postData.append('Image', 'null');
    }else{
      postData.append('Image', Image, Title);
    }  
    postData.append('isImage', (!(Image==null)).toString());


    this.http.post<Post>(this.endpoint, postData)
    .subscribe((responseData)=>{
        /*const placeholder    = this.posts[0];
        placeholder.DataBase = true;
        placeholder.PhotoId  = responseData.PhotoId;
        placeholder.PhotoPath= responseData.PhotoPath;*/
        console.log('Linked newest post to databse');
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
