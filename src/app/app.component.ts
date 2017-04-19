import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite} from 'ionic-native';
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

    platform.ready().then(() => {
            StatusBar.styleDefault();
            let db = new SQLite();
            db.openDatabase({
                name: "stats.db",
                location: "default"
            }).then(() => {
                db.executeSql("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                  "games INTEGER, goals INTEGER, assists INTEGER, minutes INTEGER, yellow INTEGER, red INTERGER)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                }, (error) => {
                    console.error("Unable to execute sql", error);
                })

                ///
                db.executeSql("INSERT INTO stats (games, goals, assits, minutes, yellow, red) VALUES (0, 0, 0, 0, 0, 0)", []).then((data) => {
                    console.log("INSERTED: " + JSON.stringify(data));
                 }, (error) => {
                     console.log("ERROR: " + JSON.stringify(error.err));
                });
                ///

            }, (error) => {
                console.error("Unable to open database", error);
            });
        });
    }
  }