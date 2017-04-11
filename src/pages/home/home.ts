import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    constructor(private navController: NavController, private platform: Platform, storage: Storage) {
        
        storage.ready().then(() => {

            storage.set('games','1');
            storage.set('goals','0');
            storage.set('assists','0');
            storage.set('minutes','0');
            storage.set('yellow','0');
            storage.set('red','0');
            
            storage.get('games').then((val) => {
                console.log('You have played', val, 'games');
            })
        })
    }

}
