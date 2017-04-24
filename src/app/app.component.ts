import { Platform} from 'ionic-angular';
import { Component } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { AboutPage } from '../pages/about/about';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
    rootPage: any = AboutPage;
 
    constructor(platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }
 
}