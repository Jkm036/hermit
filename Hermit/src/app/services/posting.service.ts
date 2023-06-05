import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor() { }

  likes = 0
  likeFill = 'none'
  dislikeFill = 'none'
  fill = 'none'

  like() {
    if (this.likeFill === 'none') {
      if (this.dislikeFill === 'red') {
        this.dislikeFill = 'none'
      }
      this.likes += 1
      this.likeFill = 'red'
    } else {
      if (this.likes > 0) {
        this.likes -= 1
        this.likeFill = 'none'
      }
    }
  }

  dislike() {
    if (this.likes > 0 && this.dislikeFill === 'none') {
      if (this.likeFill === 'red') {
        this.likeFill = 'none'
      }
      this.likes -= 1
      if (this.likes === 0) {
        this.dislikeFill ='none'
      } else this.dislikeFill = 'red'
    } else {
      if (this.likes != 0) {
        this.likes += 1
      }
      this.dislikeFill = 'none'
    }
  }
}
