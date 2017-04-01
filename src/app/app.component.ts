import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // SQLite stats database setup
    platform.ready().then(() => {
            StatusBar.styleDefault();
            let db = new SQLite();
            db.openDatabase({
                name: "stats.db",
                location: "default"
            }).then(() => {
                db.executeSql("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT," 
                +" name TEXT, team TEXT, league TEXT, position TEXT, games INTEGER, goals INTEGER, assists INTEGER, minutes INTEGER, yellow INTEGER, red INTEGER)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                }, (error) => {
                    console.error("Unable to execute sql", error);
                })
            }, (error) => {
                console.error("Unable to open database", error);
            });
        });
  }
}
