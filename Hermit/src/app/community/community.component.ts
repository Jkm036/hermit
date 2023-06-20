import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {

  @Input() name: string = ''
  @Input() tag: string = ''
  @Input() action: string = 'Join'

  /**
   * This constructuor will retrieve the parameters that are being passed to it. 
   * 
   * @param router The router link to the component
   */
  constructor(private router: ActivatedRoute) {
    this.name = this.router.snapshot.paramMap.get('name');
  }

  /**
   * This will update the name parameter whenever the name 
   * changes. 
   * 
   * i.e. when the user clicks on another community, it will update the name. 
   * 
   * Without this, the community will not be updated to the specified community. 
   */
  ngOnInit(): void {
    this.router.params.subscribe(
      params => {
        const id = params['name'];
        this.name = id
      }
    );
  }

  join() {
    this.action = this.action === 'Join' ? 'Joined' : 'Join'
  }
}
