import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hermit';
  sideMenuOpen=true;
  createcommunity=false;
  settings = false;
  home=true;
  toggleCC(){
    this.createcommunity=!this.createcommunity;
    this.settings=false;
    this.home=(!this.createcommunity && !this.settings);
  }
  toggleS(){
    this.createcommunity=false;
    this.settings=!this.settings;
    this.home=(!this.createcommunity && !this.settings);
  }
  toggleLSM(){
    this.sideMenuOpen=!this.sideMenuOpen;
  }
  toggleH(){
    this.createcommunity=false;
    this.settings=false;
    this.home=(!this.createcommunity && !this.settings);
  }
}
