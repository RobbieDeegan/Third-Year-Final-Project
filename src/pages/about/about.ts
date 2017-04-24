import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

    public footballList: Array<string>;
 
    constructor(private nav: NavController) { }
 
    pageLoaded() {
        this.footballList = JSON.parse(localStorage.getItem("football"));
        if(!this.footballList) {
            this.footballList = [];
        }
    }
 
    // Deleting items function
    delete(index: number) {
        this.footballList.splice(index, 1);
        localStorage.setItem("football", JSON.stringify(this.footballList));
    }
 
    // Adding items function - Redirect to the HomePage
    add() {
        this.nav.push(HomePage);
    }
}