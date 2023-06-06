import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor() { }

  likes = 5
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
