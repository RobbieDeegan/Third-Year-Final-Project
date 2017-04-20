import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public footballList: Array<string>;
    public footballItem: string;
 
    constructor(private nav: NavController) {
        this.footballList = JSON.parse(localStorage.getItem("football"));
        if(!this.footballList) {
            this.footballList = [];
        }
        this.footballItem = "";
    }
 
    save() {
        if(this.footballItem != "") {
            this.footballList.push(this.footballItem);
            localStorage.setItem("football", JSON.stringify(this.footballList));
            this.nav.pop();
        }
    }
 
}