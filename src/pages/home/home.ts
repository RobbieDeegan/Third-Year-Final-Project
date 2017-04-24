import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    // Set variables for the list of football events
    public footballList: Array<string>;
    public footballItem: string;
 
    constructor(private nav: NavController) {
        // Open up the list from local storage
        this.footballList = JSON.parse(localStorage.getItem("football"));
        if(!this.footballList) {
            this.footballList = [];
        }
        this.footballItem = "";
    }
 
    // Change the new item to a JSON string and store it in the list
    save() {
        if(this.footballItem != "") {
            this.footballList.push(this.footballItem);
            localStorage.setItem("football", JSON.stringify(this.footballList));
            this.nav.pop();
        }
    }
 
}