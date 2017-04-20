import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

    public footballList: Array<string>;
 
    constructor(private nav: NavController) { }
 
    onPageDidEnter() {
        this.footballList = JSON.parse(localStorage.getItem("football"));
        if(!this.footballList) {
            this.footballList = [];
        }
    }
 
    delete(index: number) {
        this.footballList.splice(index, 1);
        localStorage.setItem("football", JSON.stringify(this.footballList));
    }
 
    add() {
        this.nav.push(HomePage);
    }
}